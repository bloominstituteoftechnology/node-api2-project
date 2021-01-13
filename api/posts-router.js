const POST = require('./db-helpers');
const express = require('express');

const router = express.Router();

// retrieve all posts
router.get('/api/posts', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

// retrieve post by id
router.get('/api/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
            };
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

// create a new post
router.post('/api/posts', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            if (!post.title || !post.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            } else {
                res.status(201).json(post);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
})

module.exports = router;