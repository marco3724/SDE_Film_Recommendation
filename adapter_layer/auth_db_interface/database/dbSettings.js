const { Sequelize } = require("sequelize");

const DB = process.env.MYSQL_DATABASE;
const USER = process.env.MYSQL_USER;
const PW = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize(DB, USER, PW, {
    host: 'database',
    dialect: 'mysql',
});


try {
    sequelize.authenticate();
    console.log("authenticated");
} catch (error) {
    console.error("Unable to connect to DB: ", error);
}


module.exports = sequelize