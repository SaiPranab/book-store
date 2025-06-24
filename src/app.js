const express = require('express');
const bookRoutes = require('./modules/books/bookRoutes');
const routeHandler = require('./routes/routeHandler');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const { ENV } = require('./config/config');
const rateLimitter = require('./middleware/rateLimitter');
require('./config/dbConfig');

const app = express();

app.use(rateLimitter(100, 15 * 60 * 1000)) // -> time in miliseconds

app.use(express.json());

// app.use('/api/books', bookRoutes);
app.use('/api/v1', routeHandler)

app.use(globalErrorHandler);

module.exports = app;
