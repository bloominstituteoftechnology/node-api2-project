const express = require("express")
const postRouter = require('./routers/postRouter')
const commentRouter = require('./routers/commentRouter')
const app = express()
app.use(express.json())
app.use('/api/posts', postRouter)
app.use('/api/posts/:id/comments', commentRouter)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})