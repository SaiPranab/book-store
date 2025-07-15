const express = require('express');
const bookRoutes = require('./modules/books/bookRoutes');
const routeHandler = require('./routes/routeHandler');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const { ENV } = require('./config/config');
const rateLimitter = require('./middleware/rateLimitter');
const helmetMiddleware = require('./config/helmetConfig');
const corsOptions = require('./config/corsConfig');
require('./config/dbConfig');

const app = express();

app.use(helmetMiddleware(ENV))
app.use(corsOptions(ENV))

app.use(rateLimitter(100, 15 * 60 * 1000)) // -> time in miliseconds

app.use(express.json());

// app.use('/api/books', bookRoutes);
app.use('/api/v1', routeHandler)

app.use(globalErrorHandler);

module.exports = app;
  