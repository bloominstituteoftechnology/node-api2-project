// implement your posts router here
const Post = require('./posts-model');
const express = require('express');
const router = express.Router();

//Gets all posts
router.get('/', (req, res) =>{
    Post.find()
    .then((posts) =>{
        res.status(200).json(posts);
    })
    .catch((error) =>{
        res.status(500).json({message: 'The posts information could not be retrieved'})
    });
});


//Gets post at specified id
router.get('/:id', (req, res) =>{
    const { id } = req.params;
    Post.findById(id)
    .then((user) =>{
        user ? res.status(200).json(user) : res.status(404).json({message: 'The post with the specified ID does not exist'})
    })
})


module.exports = router;
