const express = require("express");
const { loginProcedure, verifyAuthentication } = require("../controllers/loginController.js");
const loginRouter = express.Router();

loginRouter.post("/", loginProcedure);
loginRouter.post("/isAuthenticated", verifyAuthentication);


module.exports = loginRouter