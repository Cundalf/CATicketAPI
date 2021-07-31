require('dotenv').config();
const Server = require('./models/server');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const server = new Server();

server.listen();