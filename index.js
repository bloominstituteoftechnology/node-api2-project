// require your server and launch it here
const server = require("./api/server")

server.listen(4040, () => {
	console.log("running at http://localhost:4040")
})