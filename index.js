const express =  require("express");



const commentRouter = require('./posts/commentRoute')

const server = express();

server.use(express.json());
server.use('/api/posts', commentRouter)


server.get('/',(req,res)=>{
   res.send({message:'this is the server'})//res is for responses
})

const port = 8000
server.listen(port,()=>{
   console.log('Server is running')
})
