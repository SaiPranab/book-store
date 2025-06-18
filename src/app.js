const express = require('express');
const bookRoutes = require('./modules/book/bookRoutes');
const userRoutes = require("./modules/user/userRoutes")
const routeHandler = require('./routes/routeHandler')
require('dotenv').config();
require('./config/dbConfig');

const app = express();

app.use(express.json());

// app.use('/api/books', bookRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/v1', routeHandler)

module.exports = app;
