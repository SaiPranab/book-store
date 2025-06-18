const app = require('./app');

const PORT = process.env.PORT || 1300;

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});