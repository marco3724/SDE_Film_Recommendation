const express = require("express");
const { register } = require("../controllers/registrationController.js");
const registerRouter = express.Router();

registerRouter.post("/", register);

module.exports = registerRouter