const express=require('express');

const server=express();
//declare and bring in the new router
const postsRouter=require('../node-api2-project/api/posts-router')
const commentsRouter=require('../node-api2-project/api/comments-router');
//use a middleware - postsRouter by having '/api/posts' as base url
server.use(express.json());
server.use('/api/posts',postsRouter);
server.use('/api/posts',commentsRouter); //for get comments
  
server.get('/',(req,res)=>{
    res.json({message: 'Welcome to api2!'})
})

module.exports=server;