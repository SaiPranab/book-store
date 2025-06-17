const express = require('express')
require('dotenv').config()
require('./config/dbConfig')

const bookRoutes = require("./modules/book/bookRoutes")

const app = express();
const PORT = process.env.PORT || 1300;

app.use(express.json())

app.use("/api/books", bookRoutes)

app.listen(PORT, () => {
  console.log(`server started at port :- ${PORT}`);
})