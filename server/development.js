import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

const env = process.env.NODE_ENV;

/** Database Connection */
import connectToDB from './dbConnection.js';
// connect to DB
connectToDB(env, process.env.MONGO_URI);

/** Routes */
import errorHandler from './routes/errorHandler.js';
import pyramid from './routes/pyramid.js';

/** Webpack imports ***/
import webpack from 'webpack';
import config from '../webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const compiler = webpack(config);
const webpackOptions = {
  publicPath: config.output.publicPath,
  lazy: true,
  logLevel: 'trace',
  // adds color to the terminal
  stats: {
    colors: true,
  },
};


const app = express();
const port = process.env.PORT || 3003;

if (env === 'development') {
  // logging
  const morgan = require('morgan');
  app.use(morgan('dev'));
  // webpack middleware and hot reloading
  app.use(webpackMiddleware(compiler, webpackOptions));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    heartbeat: 10000,
  }));
}


// body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// server static files same as output.publicPath from webpack.config.js
// app.use(express.static(path.join(__dirname, '../assets')));

// Routes
app.use('/api/pyramid', pyramid);
app.use(favicon(path.resolve(__dirname, '../favicon.ico')));

// base route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

app.use(errorHandler);


// Do not need to listen when testing routes.
// if (env !== 'test') {
  app.listen(port, 'localhost', () => {
    console.log('Number Pyramid Generator App Ready');
    console.log('Right-Click link below and select \'Open Link\'');
    console.log(`http://localhost:${port}`);
    // console.log(`Listening on port ${port}...`);
  });
// }

export default app;
