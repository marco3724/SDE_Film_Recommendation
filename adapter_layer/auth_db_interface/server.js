const express = require('express');
const PORT = process.env.AUTH_DB_ADAPTER || 3000;

const registrationRouter = require("./routes/registrationRoute");
const loginRouter = require("./routes/loginRoute");

const server = express();

server.use(express.json());
server.use('/register', registrationRouter);
server.use('/login', loginRouter);


server.listen(PORT, () => {
    console.log(`Authentication DB Adapter Server is running on port ${PORT}`);
})