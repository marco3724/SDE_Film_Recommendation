const express = require("express");
const { findAllSavedFilms } = require("../controllers/filmRetrieveController.js");
const retrieveFilmRouter = express.Router();

retrieveFilmRouter.get("/", findAllSavedFilms);


module.exports = retrieveFilmRouter