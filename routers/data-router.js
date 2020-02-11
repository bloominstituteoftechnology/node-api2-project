const express = require('express');

const Data = require('../data/db.js');

const router = express.Router();

// GET REQUESTS
// view all posts
router.get('/', (req, res) => {
    Data.find()
        .then(item => {
            res.status(200).json(item);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

// view posts by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Data.findById(id)
        .then(item => {
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        }).catch(err =>{
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

// view comments by post id
router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    Data.findById(id)
        .then(post => {
            if (post) {
                Data.findPostComments(id)
                    .then(item => {
                        res.status(200).json(item);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The comments information could not be retrieved." });
                    });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

// POST REQUESTS
// create a new post
router.post('/', (req, res) => {
    const post = req.body;
    
    if (!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Data.insert(post)
            .then(item => {
                res.status(201).json(post);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            });
    };
});

// create a new comment
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = req.body;

    Data.findById(id)
        .then(post => {
            if (post) {
                if (!comment.text) {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." })
                } else {
                    Data.insertComment(comment)
                        .then(item => {
                            res.status(201).json(comment);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: "There was an error while saving the comment to the database" })
                        });
                };
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

// PUT REQUEST
// Edit a post
router.put('/:id', (req, res) => {
    const { id } = req.params;

    Data.findById(id)
        .then(post => {
            if (post) {
                if (!req.body.title || !req.body.contents) {
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
                } else {
                    Data.update(id, req.body)
                        .then(item => {
                            res.status(200).json(req.body);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: "The post information could not be modified." });
                        });
                };
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

// DELETE REQUEST
// Delete a post
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Data.findById(id)
        .then(post => {
            if (post) {
                Data.remove(id)
                    .then(removed => {
                        res.status(200).json(post[0]);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The post could not be removed" });
                    });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

module.exports = router;