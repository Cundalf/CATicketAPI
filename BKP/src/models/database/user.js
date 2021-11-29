const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const User = db.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userFirstName: DataTypes.STRING(90),
    userLastName: DataTypes.STRING(90),
    userEmail: DataTypes.STRING(90),
    userPassword: DataTypes.STRING(190),
    userRole: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN
});


module.exports = User;