const app = require('./api/server.js'); // import the express package

const PORT = 5000;

app.listen(PORT,() => {
    console.log(`listing on http://localhost:${PORT}`)
});