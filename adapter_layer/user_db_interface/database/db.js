const mongoose = require("mongoose");

exports.connectDB = () => {
    const url = 'mongodb://127.0.0.1:27017/films';

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