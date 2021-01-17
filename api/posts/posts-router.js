const express = require('express')
const router = express.Router();

const Post = require('../db-helpers');

router.get('/api/posts', async (req,res)=>{
    const posts = await Post.find();
    try{
        res.status(201).json(posts);
    }catch{
        res.status(500).json({error:'The posts information could not be retrieved.'})
    }
})