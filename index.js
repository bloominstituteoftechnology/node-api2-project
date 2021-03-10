// require your server and launch it here
const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log("server started at localhost:8080")
})