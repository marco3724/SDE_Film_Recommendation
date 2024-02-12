const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('users', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});


try {
    sequelize.authenticate();
    console.log("authenticated");
} catch (error) {
    console.error("Unable to connect to DB: ", error);
}


module.exports = sequelize