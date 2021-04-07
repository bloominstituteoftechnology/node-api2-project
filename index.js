// require your server and launch it here
const server = require('./api/server');

server.listen(8080, () => {
    console.log('Server running on port 8080');
})