const express = require('express');
const bookRoutes = require('./modules/book/bookRoutes');
const userRoutes = require("./modules/user/userRoutes")
require('dotenv').config();
require('./config/dbConfig');

const app = express();

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
