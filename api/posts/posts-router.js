// implement your posts router here
const Post = require('./posts-model')
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
    Post.find(req.query)
        .then(posts =>{
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json(err,{ message: "The posts information could not be retrieved" })
        });
});

router.get('/:id', (req, res) =>{
    Post.findById(req.params.id)
    .then(post =>{
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(post)
        }
    })
    .catch(err =>{
        res.status(500).json(err,{ message: "The post information could not be retrieved" })
    });
});

router.post('/', (req,res) => {
    const newPost = req.body
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        Post.insert(newPost)
            .then(post =>{
                console.log(post)
                res.status(201).json(post)
            })
            .catch(err =>{
                res.status(500).json(err,{ message: "There was an error while saving the post to the database" })
            })
    }      
});


router.put('/:id', async (req,res)=>{
    const changes = req.body;
    const varid = req.params.id
    const updatedPost = await Post.update(varid, changes)
    console.log(updatedPost)
    try{
        if(!updatedPost){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else if(!changes.title || !changes.contents){
            res.status(400).json({ message: "Please provide title and contents for the post" })
        }else{
            res.status(200).json(updatedPost)
        }
    }catch(e){
        res.status(500).json({ message: "The post information could not be modified" })
    }
});
 
router.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const target = await Post.remove(id)
        if(!target){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(target)
        }
    }catch(e){
        res.status(500).json({ message: "The post could not be removed" })
    }
});

router.get('/:id/comments',async (req,res)=>{
    try{
        const {id} = req.params
        const comments = await Post.findPostComments(id)
        if(!comments){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(comments)
        } 
    }catch(e){
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
});

module.exports = router