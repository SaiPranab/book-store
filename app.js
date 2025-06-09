const express = require('express')
const bookRoutes = require("./routes/book-routes")
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 1300;

app.use(express.json())

app.use("/api/books", bookRoutes)

app.listen(PORT, () => {
  console.log(`server started at port :- ${PORT}`);
})