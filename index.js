const server = require("./api/server")

// require your server and launch it here
const port = 7000

server.listen(port,() =>{
    console.log(`listening on port:${port}`)
})