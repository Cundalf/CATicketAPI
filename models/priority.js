const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Priority = db.define('Priority', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING,
    state: DataTypes.BOOLEAN
});

module.exports = Priority;