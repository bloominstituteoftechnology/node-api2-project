// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error fetching posts'
            });
        });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post does not exist' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error fetching posts'
            });
        });
});

router.post('/', (req, res) => {
    if (req.body.title && req.body.contents) {
        Post.insert(req.body)
            .then(({ id }) => {
                res.status(201).json({ id, ...req.body });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Error inserting posts'
                });
            });
    } else {
        res.status(400).json({
            message: 'Title and contents are required'
        })
    }
});

module.exports = router;