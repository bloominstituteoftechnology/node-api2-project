// implement your posts router here
const Posts = require('./posts-model');
const express = require('express');
const router = express.Router();

//Gets all posts
router.get('/', (req, res) =>{
    Posts.find()
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
    Posts.findById(id)
    .then((user) =>{
        user ? res.status(200).json(user) : res.status(404).json({message: 'The post with the specified ID does not exist'});
    })
    .catch((err) =>{
        res.status(500).json({message: 'The post information could not be retrieved'});
    });
});

//Post new object to array(creates new object)
router.post('/', (req, res) =>{
    const newPost = req.body;
    
    if(!newPost.title || !newPost.contents){
        res.status(400).json({message: 'Please provide title and contents for the post'});
    } else{
        Posts.insert(newPost)
        .then((post) =>{
            res.status(201).json(post);
        })
        .catch((error) =>{
            res.status(500).json({message: 'There was an error while saving the post to the database'});
        });
    }
});


module.exports = router;
