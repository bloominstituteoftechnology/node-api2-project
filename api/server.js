// implement your server here
// require your posts router and connect it here
// Server Template
// IMPORTS AT THE TOP
const express = require("express")
const postsRouter = require('./posts/posts-router')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())
server.use('/api/posts', postsRouter)

//Sanity Check
//[GET] / (Hello World endpoint)
server.use("*",(req,res)=>{
    //console.log(data)
    res.status(200).json({message:"SERVER OPERATIONAL code: 200"})
})



module.exports = server; 