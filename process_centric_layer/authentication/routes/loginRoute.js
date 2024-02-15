const express = require("express");
const { loginProcedure } = require("../controllers/loginController.js");
const loginRouter = express.Router();

loginRouter.post("/", loginProcedure);

module.exports = loginRouter