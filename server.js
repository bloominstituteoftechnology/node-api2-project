const express= require('express');
const routerposts=require("./API/routerposts")

const server=express()
server.use(express.json())
server.use('/api/posts', routerposts)

server.get('/', (req,res)=>{
    res.send("Data from the server ")
})

module.exports=server;