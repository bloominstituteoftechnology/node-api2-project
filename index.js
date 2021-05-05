// require your server and launch it here
const server = require('./api/server');

const port = 4000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`running on port: ${port}`)
})
module.exports = server