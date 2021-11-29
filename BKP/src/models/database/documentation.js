const { DataTypes } = require('sequelize');
const db = require('../../database/connection');
const categoryModel = require("./ticketCategory");
const subCategoryModel = require("./ticketSubCategory");

const Documentation = db.define('Documentation', {
    documentationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subCategory: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    task: DataTypes.INTEGER,
    path: DataTypes.STRING(190),
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Documentation.belongsTo(categoryModel, { foreignKey: 'category' });
Documentation.belongsTo(subCategoryModel, { foreignKey: 'subCategory' });

module.exports = Documentation;