// import { DataTypes } from 'sequelize';

// import db from '../../database/connection.db';
// import employeeDeviceModel from './employeeDevice.model';
// import sectorModel from './sector.model';

// const Employee = db.define('Employees', {
//     employeeId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     employeeRecord: DataTypes.INTEGER,
//     employeeDeviceType: DataTypes.INTEGER,
//     employeeFirstName: DataTypes.STRING(90),
//     employeeLastName: DataTypes.STRING(90),
//     employeeHeadquarter: DataTypes.INTEGER,
//     employeeSector: DataTypes.INTEGER,
//     employeePhone: DataTypes.STRING(90),
//     employeeEmail: DataTypes.STRING(90),
//     state: DataTypes.BOOLEAN
// });

// Employee.belongsTo(sectorModel, { foreignKey: 'employeeSector' });
// Employee.hasMany(employeeDeviceModel);

// export default Employee;