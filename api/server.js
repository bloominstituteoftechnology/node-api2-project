const express=require('express');
var cors = require('cors');
const server=express();
//declare and bring in the new router
const postsRouter=require('./posts-router')
const commentsRouter=require('./comments-router');

//use a middleware - postsRouter by having '/api/posts' as base url
server.use(express.json());
server.use(cors());
server.use('/api/posts',postsRouter);
server.use('/api/posts',commentsRouter); //for get comments
  
server.get('/',(req,res)=>{
    res.json({message: 'Welcome to api2!'})
})

module.exports=server;