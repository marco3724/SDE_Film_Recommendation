const express = require("express");
const loginRouter = require("./routes/loginRoute");
const PORT = process.env.LOGIN_BUSINESS_PORT || 3001;

const server = express();

server.use("/login", loginRouter);

server.listen(PORT, () => {
    console.log(`Authentication DB Adapter Server is running on port ${PORT}`);
})