const express =require('express');

const server =express();
server.use(express.json());

server.get("/", (req,res)=>{
    res.send(" data from the server ")
})

module.exports=server