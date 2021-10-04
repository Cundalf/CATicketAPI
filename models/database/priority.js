const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const Priority = db.define('Priorities', {
    priorityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

module.exports = Priority;