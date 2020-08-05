const express = require('express')

const postRouter = require('./router/posts')
const commentRouter = require('./router/comments')

const server = express()

server.use(express.json())

// server.get('/hello', (req, res) => {
//     res.send('hello world')
// })

server.use('/api/posts', postRouter);
server.use('/comments', commentRouter);

const port = 8000
server.listen(8000, () => console.log('server is running...'))
 
