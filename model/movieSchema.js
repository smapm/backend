const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('movie', movieSchema);