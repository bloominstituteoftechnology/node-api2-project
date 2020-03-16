const app = require('./server.js').default;

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
