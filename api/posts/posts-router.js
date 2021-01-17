const express = require('express')
const router = express.Router();

const Post = require('../db-helpers');
const { post } = require('../server');

const errorMessage = 'The post with the specficied id does not exist'

// GET posts
router.get('/', async (req,res)=>{
    const posts = await Post.find();
    try{
        res.status(200).json(posts);
    }catch{
        res.status(500).json({error:'The posts information could not be retrieved.'})
    }
})

//get specific post
router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);
    try{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({error:errorMessage})
        }
    }catch{
        res.status(500).json({error:'the post information could not be retrieved'})
    }
})

//DELETE SPECIFIC POST 
router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await Post.remove();
        if(!user){
            res.status(404).json({error:errorMessage})
        }
    }catch{
        abort();
        res.status(500).json({error:'the post could not be removed.'})
    }
})

//CREATE POST

router.post('/',async(req,res)=>{
    const post = req.body;
    if(!post.title || !post.contents){
        abort()
        res.status(400).json({error:'Please provide title and contents for the post'})
    }else{
        try{
            const newPost = await Post.insert(post);
            res.status(201).json(newPost);
        }catch{
            res.status(500).json({error:'there was an error while saving the post to the database.'})
        }
    }
})

// UPDATE POST
router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    
    if(!post.id){
        res.status(404).json({error:errorMessage})
    }else{
        try{
            if(!post.title || !post.contents){
                abort()
                res.status(400).json({error:'Please provide title and contents for the post'})
            }else{
                const updatedPost = Post.update(id,changes)
                if(updatedPost){
                    res.status(200).json(updatedPost)
                }
            }
        }catch{
            abort();
            res.status(500).json({error:'the post information could not be modified.'})
        }
    }
})

module.exports = router;