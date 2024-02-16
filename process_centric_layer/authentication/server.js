const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const PORT = process.env.AUTHENTICATION_PROCESS_PORT || 3003;
const registrationRouter = require("./routes/registrationRoute");
const loginRouter = require("./routes/loginRoute");

const server = express();

server.use(bodyParser.json());
server.use(cookieParser());
server.use('/register', registrationRouter);
server.use('/login', loginRouter);

server.listen(PORT, () => {
    console.log(`Authentication DB Adapter Server (Registration) is running on port ${PORT}`);
})