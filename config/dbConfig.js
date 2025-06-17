const mysql = require('mysql2/promise')

const connectionPromise = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'demo'
})
.then(() => {
  console.log('My SQL Successfully connected');
})
.catch((err) => {
  console.log('Error occurred during connection');
})

module.exports = connectionPromise;