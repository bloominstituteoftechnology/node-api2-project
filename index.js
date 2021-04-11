// require your server and launch it here

const server = require("./api/server.js")

server.listen(4000, () => {
	console.log("running at http://localhost:4000")
})
