const mongoose = require("mongoose");

const savedFilms = mongoose.Schema({
    userEmail: String,
    films: [{
        id: String,
        year: Number,
        title: String,
        rating: Number
    }]
});

module.exports = mongoose.model('SavedFilms', savedFilms);