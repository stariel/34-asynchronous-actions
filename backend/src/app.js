'use strict';

const debug = require('debug')('app');

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

// let corsOptions = {
//   origin: 'http://example.com'
// };
app.use(cors());


app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

import router from './api/api.js';
app.use('/api/v1', router);

app.use(notFound);

app.use(errorHandler);

let isRunning = false;

let server = null;

module.exports = {
  start: (port) => {
    if(! isRunning) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        isRunning = true;
        debug('Server is up on port', port);
      });
    }
    else {
      debug('Server is already running');
    }
  },

  stop: () => {

    server && server.close();
    isRunning = false;
    console.log('Server has been stopped');
  },

  server: app,
};
