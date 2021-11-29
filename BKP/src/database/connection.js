const Sequelize = require('Sequelize');

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: (process.env.NODE_ENV === 'production'),
    }
);

module.exports = db;