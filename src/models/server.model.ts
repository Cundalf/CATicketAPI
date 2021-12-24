// Dependencias
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import rateLimit from 'express-rate-limit';
import fileUpload from 'express-fileupload';

// Rutas
import Auth from '../routes/auth.route';
import User from '../routes/user.route';
//import Censo from '../routes/Censo';
//import Cco from '../routes/Cco';

// Logs
import logger from '../libs/logger.lib';
import morgan, { StreamOptions } from 'morgan';

// Type para gestionar las rutas.
type PathsAPI = {
    public: string,
    doc: string,
    auth: string,
    user: string,
    employeeDevice: string
};

class Server {

    // Singleton
    static instance: Server;

    private app: Application;
    private port: string;
    private paths: PathsAPI;

    // Lo utilizamos principalmente para TEST. Retornamos la instancia de express.
    get expressInstance(): Application {
        return this.app;
    }

    private constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Definimos las rutas
        this.paths = {
            public: '/',
            doc: '/doc',
            auth: '/auth',
            user: '/user',
            employeeDevice: '/employee/device'
        };

        logger.info('Server instanciado');

        this.middlewares();
        this.logging();
        this.routes();
    }

    // Configura los middlewares que necesitamos en express
    private middlewares(): void {
        // CORS
        this.app.use(cors());

        // x-www-form-urlencoded
        this.app.use(express.urlencoded({ extended: false }));

        // Body config
        this.app.use(express.json());

        // Security
        this.app.use(
            helmet({
                contentSecurityPolicy: false,
            })
        );

        // DDOS Protection
        // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
        this.app.enable('trust proxy');
        const limiter: rateLimit.RateLimit = rateLimit(
            {
                windowMs: 15 * 60 * 1000, // 15 minutes 
                max: 200, // limit each IP to 200 requests per windowMs
                message: 'Too many accounts created from this IP, please try again after an hour'
            }
        );
        this.app.use(limiter);

        // Fileupload Config
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

        logger.info('Middlewares configurados');
    }

    // Configura el sistema de logging (morgan + winston)
    private logging(): void {

        const stream: StreamOptions = {
            write: (message) => logger.http(message),
        };

        // Solo trackeo en desarrollo las peticiones.
        const skip = () => {
            const env = process.env.NODE_ENV || 'development';
            return env !== 'development';
        };

        const morganMiddleware = morgan(
            ':method :url :status :res[content-length] - :response-time ms',
            { stream, skip }
        );

        this.app.use(morganMiddleware);
    }

    // Configuramos las rutas
    private routes(): void {
        //* Rutas estaticas
        this.app.use(this.paths.public, express.static(path.resolve(__dirname, '../../public')));
        this.app.use(this.paths.doc, express.static(path.resolve(__dirname, '../../public/docs')));

        //* Rutas de servicios
        this.app.use(this.paths.auth, Auth);
        this.app.use(this.paths.user, User);
    }

    // Crea si no existe una instancia de la clase. Retorna la instancia en memoria.
    static loadServer(): Server {
        if (!Server.instance) {
            Server.instance = new Server();
        }

        return Server.instance;
    }

    // Inicia el servidor de express
    listen(): void {
        this.app.listen(this.port, () => {
            logger.info(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default Server;