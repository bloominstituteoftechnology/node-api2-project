const express = require('express');
const Post = require('../../data/db');

const router = express.Router();

//Get all post objects
router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ 
                error: "The posts information could not be retrieved." 
            });
        });
});

//Get a single post object by id
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if (post.length > 0) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ 
              message: "The post with the specified ID does not exist." 
            });
        }
    })
    .catch(() => {
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})

//Get comments associated with a specific post
router.get('/:id/comments', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if (post.length > 0) {
            Post.findPostComments(req.params.id)
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(() => {
                res.status(404).json({
                    error: "Cant think just write something"
                })
            })
        } else {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." 
            });
        }
    
    })
    .catch(() => {
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    })
})

//Post a new post
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ 
            errorMessage: "Please provide title and contents for the post." 
        })
      }
      Post.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(() => {
            res.status(500).json({ 
                error: "There was an error while saving the post to the database" 
            });
    });
})

//Post a new comment on a post 
router.post('/:id/comments', (req, res) => {
    if (!req.body.text) {
        res.status(400).json({ 
            errorMessage: "Please provide text for the comment." 
        })
      } 
    Post.insertComment(req.body)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ 
                    message: "The post with the specified ID does not exist." 
                });
            }
    })
})

//Update a post 
router.put('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.length > 0) {
                Post.update(req.params.id, req.body)
                    .then(post => {
                        res.status(201).json(post)
                    })
                    .catch(() => {
                        res.status(500).json({
                            error: "The post information could not be retrieved."
                        })
                    })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
})

//Delete a post
router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.length > 0) {
                Post.remove(req.params.id)
                    .then(() => {
                        res.status(201).json({
                            message: "Deletion success."
                        })
                    })
                    .catch(() => {
                        res.status(500).json({
                            error: "The post could not be removed"
                        })
                    })
            } else {
                res.status(404).json({ 
                    message: "The post with the specified ID does not exist." 
                });
            }
        })
})

module.exports = router
