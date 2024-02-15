const express = require("express");
const { register } = require("../controllers/registrationController.js");
const registrationRouter = express.Router();

registrationRouter.post("/", register);

module.exports = registrationRouter