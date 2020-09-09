const express = require('express');
const router = express.Router();
const Posts = require('../data/db.js')// assign the data to Post object

//// Working endpoint - returns all posts
router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the posts',
            });
        });
});

// Working endpoint - returns comment by ID
router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Comment and Post not found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the post',
            });
        });
});

// Working endpoint - returns post by id
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Comment or  Post not found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the post',
            });
        });
});

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error adding the post',
            });
        });
});
// Working endpoint - deletes post by id
router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The post has been nuked' });
            } else {
                res.status(404).json({ message: 'The post could not be found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error removing the post',
            });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'The post could not be found' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error updating the post',
            });
        });
});

router.post('/:id/comments', (req, res) => {
    const messageInfo = { ...req.body, post_id: req.params.id }
    // on the body add a parameter [id] 
    const { id } = req.param;
    Posts.insertComment(messageInfo)
        .then(message => {
            res.status(201).json(message);
        })
        .catch(err => {
            res.status(500).json({ message: "error adding" }, err)
        });

});

module.exports = router;