const express = require("express");
const { saveFilm } = require("../controllers/filmSaveController.js");
const filmSaveRouter = express.Router();

filmSaveRouter.post("/", saveFilm);


module.exports = filmSaveRouter