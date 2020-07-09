const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.get('/:gameId', async (req, res) => {
    try {
        const game = await Game.findOne({game_name: req.params.gameId});
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const game = await Game.find({creator: req.params.userId});
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.post('/', async (req, res) => {
    const gameNameExist = await Game.findOne({game_name: req.body.game_name});
    if (gameNameExist) return res.status(409).send("Game name alredy exists");

    const user = await User.findById(req.body.creator);
    const game = new Game({
        game_name: req.body.game_name,
        board: req.body.board,
        creator: user,
        turn: req.body.turn
    });

    try {
        const savedGame = await game.save();
        res.status(200).json({_id: savedGame._id, game_name: savedGame.game_name, board: savedGame.board, turn: savedGame.turn});
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.put('/:gameId', async (req, res) => {
    try {
        await Game.updateOne({game_name: req.params.gameId},
            {
                $set:
                    {
                        board: req.body.board,
                        turn: req.body.turn
                    }
            });
        const game = await Game.findOne({game_name: req.params.gameId});
        res.status(200).json({_id: game._id, game_name: game.game_name, board: game.board, turn: game.turn});
    } catch (error) {
        res.status(400).json({message: error});
    }
});


module.exports = router;
