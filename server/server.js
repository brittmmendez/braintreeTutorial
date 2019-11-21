// Add variables from dotenv into process.env vars
require('dotenv').config();

// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

// Routes Setup
const routes = require('./routes');

// App Setup
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add routes after setting up middleware
routes(app);

// Server Setup
const port = process.env.NODE_ENV == 'production' ? 80 : 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);