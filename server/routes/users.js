const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../models/validations/verifyToken');
const {registerValidation, loginValidacion} = require('../models/validations/userValidation');

//router.get('/', verify, async (req, res) => {
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.get('/profile/:userId', verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.post('/', async (req, res) => {
    const {errorValidation} = registerValidation(req.body);
    if (errorValidation) return res.status(400).send(errorValidation.details[0].message);

    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(409).send("Email alredy exists");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email
    });

    try {
        const savedUser = await user.save();
        res.status(200).json({_id: savedUser._id, username: savedUser.username, email: savedUser.email});
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.delete('/profile', verify, async (req, res) => {
    try {
        const removedUser = await User.remove({_id: getUserId(req.headers['auth-token'])});
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.put('/profile', verify, async (req, res) => {
    const usernameExists = await User.findOne({username: req.body.username});
    if (usernameExists) {
        res.statusMessage = 'Username alredy exists';
        return res.status(409).send("Username alredy exists");
    }
    try {
        await User.updateOne({_id: getUserId(req.headers['auth-token'])},
            {
                $set:
                    {
                        username: req.body.username
                    }
            });
        const user = await User.findById(getUserId(req.headers['auth-token']));
        res.status(200).json({_id: user._id, username: user.username, email: user.email});
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {error} = loginValidacion(req.body);
        if (error) {
            res.statusMessage = error.details[0].message;
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({email: req.body.email});
        if (!user){
            res.statusMessage = 'User doesn\'t exists';
            return res.status(400).send("User doesn\'t exists");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.statusMessage = 'Wrong password';
            return res.status(400).send("Wrong password");
        }

        var token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.setHeader("auth-token", token);
        req.session.username = user.username;
        res.status(200).json({token: token});
    } catch (error) {
        res.status(400).send({message: error});
    }
});

router.get('/profile', verify, async (req, res) => {
    try {
        const user_id = getUserId(req.headers['auth-token']);
        const user = await User.findById(user_id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send({message: error});
    }
});

function getUserId(token) {
    return jwt.decode(token)['_id'];
}

module.exports = router;
