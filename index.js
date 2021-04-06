// require your server and launch it here
const server = require('./api/server')

server.listen(8000, () => {
    console.log('server is up and running on port 8000')
})