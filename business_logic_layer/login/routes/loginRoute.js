const express = require("express");
const { login, verifyToken } = require("../controllers/loginController.js");
const loginRouter = express.Router();

loginRouter.post("/", login);
loginRouter.post("/verify-token", verifyToken);

module.exports = loginRouter