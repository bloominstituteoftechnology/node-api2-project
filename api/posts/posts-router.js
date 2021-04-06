// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req,res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({message:"The posts information could not be retrieved"})
        })
})

router.get('/:id', (req,res) => {
    const id = req.params.id;
    Post.findById(id)
        .then(post => {
            post ? res.status(200).json(post) : res.status(404).json({message: "The post with the specified ID does not exist"})
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

router.post('/',  (req,res) => {
    const newPost = req.body;
    (!newPost.title || !newPost.contents) 
    ? res.status(400).json({ message: "Please provide title and contents for the post" }) 
    : Post.insert(newPost)
        .then(post => {
            const {id} = post;
            return Post.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(() => {
            res.status(500).json
        })
    })

router.put('/:id', async (req,res) => {
    const id = req.params.id;
    const updatedPost = req.body;
    const oldPost = await (Post.findById(id))
    if (!oldPost){
        res.status(404).json({ message: "The post with the specified ID does not exist" });
    }
    (!updatedPost.title || !updatedPost.contents)
    ? res.status(400).json({ message: "Please provide title and contents for the post" })
    : Post.update(id,updatedPost)
        .then(() => {
            return Post.findById(id)
        })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be modified" })
        })

})

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const oldPost = await (Post.findById(id))
    if (!oldPost){
        res.status(404).json({ message: "The post with the specified ID does not exist" });
    }
    Post.remove(id)
        .then(() => {
            return Post.findById(id)
        })
        .then(deleted => {
            deleted === undefined 
            ? res.status(200).json(oldPost)
            : res.status(500).json({ message: "The post could not be removed" })
        })
        .catch(() => {
            res.status(500).json({ message: "The post could not be removed" })
        })
})

router.get('/:id/comments', async (req,res) => {
    const id = req.params.id;
    const oldPost = await (Post.findById(id))
    if (!oldPost){
        res.status(404).json({ message: "The post with the specified ID does not exist" });
    } else{
    Post.findPostComments(id)
        .then(comments => {
            res.status(200).json(comments)
        })  
        .catch(() => {
            res.status(500).json({ message: "The post with the specified ID does not exist" })
        })
    }
})

module.exports = router;