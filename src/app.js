const express = require('express');
const bookRoutes = require('./modules/books/bookRoutes');
const routeHandler = require('./routes/routeHandler');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const { ENV } = require('./config/config');
const rateLimitter = require('./middleware/rateLimitter');
// const ipLogger = require('./middleware/ipLogger');
require('./config/dbConfig');

const app = express();

app.use(rateLimitter(100, 15 * 60 * 1000)) // -> time in miliseconds

app.use(express.json());

// app.use('/api/books', bookRoutes);
app.use('/api/v1', routeHandler)
app.use('/get-env', (req, res) => res.send('Environment is ' + ENV))
app.use('/test', (req, res) => { throw new Error("Some random error") })

app.use(globalErrorHandler);

module.exports = app;
