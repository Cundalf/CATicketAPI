const { DataTypes } = require('sequelize');
const db = require('../../database/connection');

const employeeDeviceTypeModel = require('./employeeDeviceType');

const EmployeeDevice = db.define('EmployeeDevices', {
    employeeDeviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employeeDeviceName: DataTypes.STRING(190),
    employeeDeviceType: DataTypes.INTEGER,
    deviceSerialNumber: DataTypes.STRING(190),
    deviceIp: DataTypes.STRING(190),
    hostname: DataTypes.STRING(190),
    state: DataTypes.BOOLEAN
});

EmployeeDevice.belongsTo(employeeDeviceTypeModel, { foreignKey: 'employeeDeviceType' });

module.exports = EmployeeDevice;