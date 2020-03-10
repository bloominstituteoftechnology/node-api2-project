const express = require('express');

const router = express.Router();

const Posts = require('./db');

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then( post => {
            res.status(200).json(post);
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the posts"
            })
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then( post => {
            if (post) {
            res.status(200).json(post);
            } else if (!post.id) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved."})
        })
})

router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
        .then( post => {
            if (post) {
                res.status(200).json(post);
            } else if (!post.id) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({ error: "The comments information could not be retrieved."})
        })
})

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    Posts.insert({ title, contents})
        .then( id => {
            if (id) {
                res.status(201).json(id);
            } else if (!id.title || !id.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
            }
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

router.post('/:id/comments', (req, res) => {
    // Posts.findPostComments(req.params.id)
    Posts.insertComment(req.body)
        .then( comment => {
            if (comment) { 
                res.status(201).json(comment);
            } else if (!comment.post_id) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            } else if (!comment.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment."})
            }
        })
        .catch( error => {
            console.log(error);
                res.status(500).json({ message: "There was an error while saving the comment to the database."})
        })
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then( post => {
            if (post) {
                res.status(200).json(post);
            } else if (!post.id) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({ error: "The post could not be removed."})

        })
})

router.put('/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
        .then( post => {
            if (post) {
                res.status(200).json(post);
            } else if (!post.id) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            } else if (!post.title || !post.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
            }
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be modified."})
        })
})


module.exports = router;