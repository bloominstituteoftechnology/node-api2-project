const express = require("express")

const server = express()
const port = 2020

server.use(express.json())

server.get("/", (req, res) => {
	res.json({
		message: "Web API II",
	})
})

// CRUD operations below



// Last line
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
