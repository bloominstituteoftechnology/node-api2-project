const express = require('express');

const db = require('../data/db');

const router = express.Router(); 

router.get('/', (req, res) => {
    db.find()
        .then(arr => {
            res.status(200).json(arr);
        })
        .catch(err => {
            res.status(500).json({
                err,
                error: "The post information could not be retrieved!"
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    error: "The post with the specified ID does not exist!"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err,
                error: "The post information could not be retrieved!"
            });
        });
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    db.findPostComments(id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({
                    error: "The post with the specified ID does not exist!"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err,
                error: "The comments information could not be retrieved!"
            });
        });
});

router.post('/', (req, res) => {
    const postBody = req.body;
    
    if(postBody.title && postBody.contents) {
        db.insert(postBody)
            .then(idObj => {
                db.findById(idObj.id)
                    .then(post => {
                        res.status(201).json(post);
                    })
                    .catch(err => {
                        err,
                        res.status(500).json({
                            error: "There was error while saving the post to the database!"
                        });
                    });
            })
            .catch(err => {
                err,
                res.status(500).json({
                    error: "There was error while saving the psot to the database!"
                });
            });
    } else {
            res.status(400).json({
                error: "Please provide title and contents for the post!"
            });
    }
});

router.post('/:id/comments', (req, res) => {
 
});

router.put('/:id/comments', (req, res) => {
 
});

router.delete('/:id/comments', (req, res) => {
 
});


module.exports = router; 