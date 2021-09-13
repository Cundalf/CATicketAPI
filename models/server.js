const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const RateLimit = require('express-rate-limit');

const User = require('../models/user');
const db = require('../database/connection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            /*buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',*/
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
            await User.sync({ alter: true });
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
        this.app.use(helmet());

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
        /*this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));*/
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening Port: ', this.port, "ENV:", process.env.NODE_ENV);
        });
    }

}

module.exports = Server;