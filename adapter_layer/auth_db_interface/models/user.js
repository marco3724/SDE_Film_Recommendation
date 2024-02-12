const { Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../database/dbSettings.js")

const User = sequelize.define('User', {
    /*
    Non sono sicuro serva, uso la mail come chiave primaria
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    */
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User