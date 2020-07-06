const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    game_name: {
        type: String,
        required: true,
        max: 256,
        min: 5
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    board: {
        type: String,
        required: true
    },
    turn: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Games', GameSchema);
