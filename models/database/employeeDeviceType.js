const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const EmployeeDeviceType = db.define('EmployeeDeviceTypes', {
    employeeDeviceTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: DataTypes.STRING(45),
    state: DataTypes.BOOLEAN
});

module.exports = EmployeeDeviceType;