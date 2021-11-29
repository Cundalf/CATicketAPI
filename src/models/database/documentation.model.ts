import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';
import categoryModel from './ticketCategory.model';
import subCategoryModel from './ticketSubCategory.model';

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

export default Documentation;