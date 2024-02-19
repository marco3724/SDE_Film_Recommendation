const mongoose = require("mongoose");

const savedFilms = mongoose.Schema({
    userEmail: String,
    films: [{
        id: String,
        image: String,
        plot: String,
        filmLenght: String,
        year: Number,
        genres: [String],
        title: String,
    }]
});

module.exports = mongoose.model('SavedFilms', savedFilms);