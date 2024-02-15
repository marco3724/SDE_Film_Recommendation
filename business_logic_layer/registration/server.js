const express = require("express");
const bodyParser = require("body-parser");
const registrationRouter = require("./routes/registerRoute.js");
const PORT = process.env.REGISTRATION_BUSINESS_PORT || 3002;

const server = express();

server.use(bodyParser.json());
server.use("/register", registrationRouter);

server.listen(PORT, () => {
    console.log(`Authentication DB Adapter Server (Registration) is running on port ${PORT}`);
})