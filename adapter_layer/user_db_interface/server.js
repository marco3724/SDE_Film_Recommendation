const express = require('express');
const filmSaveRouter = require("./routes/filmSaveRoute.js");
const retrieveFilmRouter = require("./routes/retrieveFilmRoute.js");
const bodyParser = require("body-parser");
const {connectDB} = require("./database/db.js");
const PORT = process.env.USER_ADAPTER_PORT || 3000;

const server = express();
connectDB();
server.use(bodyParser.json());
server.use("/save-film", filmSaveRouter);
server.use("/retrieve-film", retrieveFilmRouter);

server.listen(PORT, () => {
    console.log(`Authentication DB Adapter Server is running on port ${PORT}`);
})