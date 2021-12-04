const server = require('./api/server')
server.listen(1234, () => {
    console.log('server running on port 1234')
})