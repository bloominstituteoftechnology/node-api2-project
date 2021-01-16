const express=require('express');

const server=express();
//declare and bring in the new router
const postsRouter=require('../node-api2-project/api/posts-router')
//use a middleware - postsRouter by having '/api/posts' as base url
server.use(express.json());
server.use('/api/posts',postsRouter);
  
server.get('/',(req,res)=>{
    res.json({message: 'Welcome to api2!'})
})

module.exports=server;