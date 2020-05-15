const express = require('express')
const PostRouter = require('../router/PostRouter')
const server = express()

server.use(express.json())
server.use('/api/posts',PostRouter)

server.get('/', (req, res) => {
	res.send(`
      <h2> I love Node.js </h>
      <p> Stay at Home Order </p>
    `)
})

module.exports = server