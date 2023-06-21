const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    username: { type: String, required: true, },
    gamePlayed: {type: String, required: true, },
    result: { type: String, required: true },
}, {
    timestamps: true,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;