const Post = require('./db-helpers');
const express = require('express');

const router = express.Router();

// retrieve all posts
router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

// retrieve post by id
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            if (!post.title || !post.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            } else {
                res.status(201).json(post);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database." });
        });
});

// update a post
router.put('/:id', (req, res) => {
    const changes = req.body;

    Post.update(req.params.id, changes)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else if (!changes.title || !changes.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            } else {
                res.status(200).json(post);
            };
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." });
        });
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with that specified ID does not exist." });
            } else {
                res.status(200);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed." })
        });
});

// get comments for a post
router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(comments => {
            if (!comments.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(comments)
            };
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
});

// make comment for post
router.post('/:id/comments', (req, res) => {
    Post.insertComment(req.body)
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else if (!comment.text) {
                res.status(400).json({ message: "Please provide text for the comment." });
            } else {
                res.status(201).json(comment);
            };
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database." });
        });
});

module.exports = router;