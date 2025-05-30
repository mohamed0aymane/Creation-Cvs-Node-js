import express from 'express';
import cvs from './routes/cvs.route.js';
import cors from 'cors';
import requestLogger from './middlewares/request-logger.js';

export default class Server {
    constructor(port = 3000) {
        this.app=express();
        this.port = port;
        this.config();
        this.routes();
    }

    config(){
        this.app.use(express.static('public'));
        this.app.use(express.json()); 
   
        this.app.use(cors()); 
        this.app.use(requestLogger());
    }

    routes(){
        this.app.use('/api/cvs',cvs);
    }

    start(callback) {
        if(callback==undefined){
            callback=()=>console.log(`Server running on port ${this.port}`);
        }
        this.app.listen(this.port, callback);
    }

}