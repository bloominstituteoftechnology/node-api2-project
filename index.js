// require your server and launch it here
console.log('index.js console.log')

const server = require('./api/server')

const PORT = 5000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})