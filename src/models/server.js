// Dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const RateLimit = require('express-rate-limit');

// Database Connection
const db = require('../database/connection');

// Database Models
const userModel = require('./database/user');
const ticketUpdatesModel = require('./database/ticketUpdates');
const documentationModel = require('./database/documentation');
const employeeModel = require('./database/employee');
const employeeDeviceModel = require('./database/employeeDevice');
const employeeDeviceTypeModel = require('./database/employeeDeviceType');
const headquarterModel = require('./database/headquarter');
const orderModel = require('./database/order');
const priorityModel = require('./database/priority');
const responsibleModel = require('./database/responsible');
const sectorModel = require('./database/sector');
const ticketModel = require('./database/ticket');
const ticketCategoryModel = require('./database/ticketCategory');
const ticketStateModel = require('./database/ticketState');
const ticketSubCategoryModel = require('./database/ticketSubCategory');
const ticketTaskModel = require('./database/ticketTask');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            employeeDevice: '/api/employee/device',
            // uploads: '/api/uploads',
        };

        this.connectDB();

        if (process.env.NODE_ENV == 'development') {
            this.syncDB();
        }

        this.middlewares();
        this.routes();
    }

    async connectDB() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error(error);
        }
    }

    async syncDB() {
        try {
            //const config = { force: true };
            //const config = { alter: true };
            const config = {}; 
            
            // User Models
            await userModel.sync(config);
            
            // Aux Models
            await headquarterModel.sync(config);
            await sectorModel.sync(config);
            await priorityModel.sync(config);
            
            // Employee Models
            await employeeDeviceTypeModel.sync(config);
            await employeeModel.sync(config);
            await employeeDeviceModel.sync(config);
            
            // Ticket Aux Models
            await ticketCategoryModel.sync(config);
            await ticketSubCategoryModel.sync(config);
            await ticketStateModel.sync(config);
            await ticketTaskModel.sync(config);
            
            // Ticket Dependencies
            await documentationModel.sync(config);
            await orderModel.sync(config);
            
            // Main Ticket Model
            await ticketModel.sync(config);
            
            // Ticket Dependencies
            await responsibleModel.sync(config);
            await ticketUpdatesModel.sync(config);

            console.log('Database OK');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // x-www-form-urlencoded
        this.app.use(express.urlencoded({ extended: false }));

        // Body config
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));

        // Security
        //this.app.use(helmet());
        this.app.use(
            helmet({
                contentSecurityPolicy: false,
            })
        );

        // DDOS Protection
        // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
        //app.enable('trust proxy');

        var limiter = new RateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes 
            max: 250, // limit each IP to 250 requests per windowMs 
            delayMs: 0 // disable delaying - full speed until the max limit is reached 
        });

        this.app.use(limiter);

        // Fileupload Config
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.employeeDevice, require('../routes/employee/employeeDevice'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening Port: ', this.port, "ENV:", process.env.NODE_ENV);
        });
    }

}

module.exports = Server;