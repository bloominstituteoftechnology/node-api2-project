const express = require('express')
const router = express.Router();

const Post = require('../db-helpers');


// GET posts
router.get('/api/posts', async (req,res)=>{
    const posts = await Post.find();
    try{
        res.status(200).json(posts);
    }catch{
        res.status(500).json({error:'The posts information could not be retrieved.'})
    }
})

//get specific post
router.get('/api/posts/:id',async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);
    try{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({error:'The post with the specific ID does not exist.'})
        }
    }catch{
        res.status(500).json({error:'the post information could not be retrieved'})
    }
})

//DELETE SPECIFIC POST 
router.delete('/api/posts/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await Post.remove();
        if(!user){
            res.status(404).json({error:'the post with the specified id does not exist.'})
        }
    }catch{
        user.abort();
        res.status(500).json({error:'the post could not be removed.'})
    }
})