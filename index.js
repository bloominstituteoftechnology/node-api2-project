// require your server and launch it here
const server = require('./api/server')
server.listen(1234, () => {
    console.log('server is running on port 1234')
})