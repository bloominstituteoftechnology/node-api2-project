const app = require('./api/server');

const port = 5000;

app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
app.timeout = 60 * 10 * 1000;
