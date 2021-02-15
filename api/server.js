const http = require("http")
const server = http.createServer((req, res) => {
    res.statusCode = 200
    
    //tell the browser to render the response as HTML
    res.setHeader("Content-Type", "text/html")

    //send data
    res.write("<h1>Hello, World</h1>")
    res.end()
})

module.exports = server;