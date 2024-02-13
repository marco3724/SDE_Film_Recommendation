const express = require('express');
const sequelize = require("./database/dbSettings");
const PORT = process.env.AUTH_ADAPTER_PORT || 3000;

const registrationRouter = require("./routes/registrationRoute");
const loginRouter = require("./routes/loginRoute");

const server = express();

server.use(express.json());
server.use('/register', registrationRouter);
server.use('/login', loginRouter);

try {
    sequelize.sync({ force: true });
} catch (error) {
    console.error("Failing sync with db: ", error);
}

server.listen(PORT, () => {
    console.log(`Authentication DB Adapter Server is running on port ${PORT}`);
})