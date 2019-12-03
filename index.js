const server = require('./api/server')



const port = 5000;
server.listen(port, () => {
    console.log("\n Server running on http://localhost:5000***\n")
})