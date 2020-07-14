const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 4600;
const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/games');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/draughts', gameRoutes);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true},
    () => console.log('Connected to DB!')
);

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname })
});

app.listen(port, (req, res) => {
    console.log(`Server on port ${port}`);
});
