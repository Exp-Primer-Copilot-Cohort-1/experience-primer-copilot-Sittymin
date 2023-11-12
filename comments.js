// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for GET /comments/:id
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id

// Load modules
const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const debug = require('debug')('app:startup');
const comments = require('./routes/comments');
const home = require('./routes/home');

// Create web server
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/comments', comments);
app.use('/', home);

// Configuration
debug('Application name: ' + config.get('name'));
debug('Mail server: ' + config.get('mail.host'));

// Environment
debug(`NODE_ENV: ${process.env.NODE_ENV}`);
debug(`app: ${app.get('env')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});