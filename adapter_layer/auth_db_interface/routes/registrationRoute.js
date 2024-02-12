const express = require("express");
const { createUser } = require("../controllers/registrationController.js");
const registrationRouter = express.Router();

registrationRouter.post("/", createUser);

module.exports = registrationRouter