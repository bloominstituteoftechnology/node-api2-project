const express = require('express');
const router = express.Router();
const Posts = require('./db.js');

// POST - Create
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        });
    });
});

router.post('/:id/comments', (req, res) => {
    const commentInfo = { ...req.body, post_id: req.params.id }
    Posts.insertComment(commentInfo)
    .then(comment => {
        res.status(201).json(comment);
    })
    .catch(err => {
        res.status(500).json({
            message: 'There was an error while saving the comment to the database',
            err
        })
    });
});

// GET - Read
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'The posts information could not be retrieved.'
        });
    });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'The post information could not be retrieved.'
        });
    });
});

router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'The comments information could not be retrieved.'
        });
    });
});

// UPDATE - Put
router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post)
            } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'The post information could not be modified.'
        });
    });
});

// DELETE - Delete
router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'This post has been deleted.'
            })
            } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'The post could not be removed'
        });
    });
});

module.exports = router;