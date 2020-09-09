const whatEverWeWant =  require('./server.js');

const PORT = 4000;

whatEverWeWant.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});