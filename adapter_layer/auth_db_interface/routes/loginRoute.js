const express = require("express");
const { login } = require("../controllers/loginController.js");
const loginRouter = express.Router();

loginRouter.post("/", login);

module.exports = loginRouter