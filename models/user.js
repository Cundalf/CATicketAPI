const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const User = db.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    state: DataTypes.BOOLEAN,
    role: DataTypes.INTEGER
});


module.exports = User;