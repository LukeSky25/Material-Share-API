import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from "express";
import cors from 'cors';

import home from './src/routes/home';
import usuario from './src/routes/usuario';
import token from './src/routes/token';

const whiteList = [
  'http://192.168.56.103:3001',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null,true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/user/', usuario);
    this.app.use('/tokens/', token);
  }

}

export default new App().app;
