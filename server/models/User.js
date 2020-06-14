const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 256,
        min: 5
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    email: {
        type: String,
        required: true,
        max: 256,
        min: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);
