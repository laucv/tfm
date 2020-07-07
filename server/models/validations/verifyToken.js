const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['auth-token'];
    if(!token) return res.status(401).send('Access denied');
    try{
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifyToken;
        next();
    }catch (error) {
        console.log(error);
        res.status(400).send('Invalid token');
    }
}
