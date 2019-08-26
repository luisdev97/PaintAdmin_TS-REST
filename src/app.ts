import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { myLogger, errores } from './middlwares/index';

import ClientRoutes from './routes/ClientRoutes';
import TaskRoutes from './routes/TaskRoutes';


//Class that contains the logic of our express server
class Server {

    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }



    config(){
        const MONGODB_URI: string = 'mongodb://localhost/paint_admin_db';
        mongoose.connect(process.env.MONGODB_URI || MONGODB_URI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        //Settings
        this.app.set('port',process.env.PORT || 3000);
        //Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        //this.app.use(myLogger);
    }


    routes(){
        this.app.use('/api/clients',ClientRoutes);
        this.app.use('/api/tasks',TaskRoutes)
    }


    start(){
        const port = this.app.get('port');
        this.app.listen(port,() => console.log(`Server on port: ${port}`));
    }
}

const server: Server = new Server();
server.start();