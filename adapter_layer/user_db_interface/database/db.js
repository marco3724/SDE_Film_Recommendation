const mongoose = require("mongoose");

exports.connectDB = () => {
    const url = `mongodb://user_db:${process.env.USER_DB_PORT}/films`

    try {
        mongoose.connect(url);
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }

    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });
   
    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
    return;
}