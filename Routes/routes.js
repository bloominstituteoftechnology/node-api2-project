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
    db.findById(req.params.id)

    .then((post) => {
        if (post) {
            req.body.text ? 
                db.insertComment(req.body)
                    .then(res.status(200).json(req.body))
                    .catch(err => {
                        console.log(err);
                    })
            : res.status(400).json({ 
                errorMessage: "Please provide text for the comment."
            });
        } else {
            res.status(404).json({
                message: "post not found",
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            err,
            message: "Error processing request",
         });
    });
});

router.put('/:id/comments', (req, res) => {
    if (req.body.title && req.body.contents) {
		db.update(req.params.id, req.body)
			.then((count) => {
				if (count) {
					db.findById(req.params.id).then((post) => res.status(200).json(post));
				} else {
					res.status(404).json({ 
                        message: "The post with the specified ID does not exist" 
                    });
				}
			})
			.catch((err) =>
				res.status(500).json({
                    error: "The post information could not be modified" 
                })
			);
	} else {
		res.status(400).json({
            message: "Please provide title and contents for the post" 
        });
	}
});

router.delete('/:id/comments', (req, res) => {
    db.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ 
                    message: "The post has been deleted" 
                });
			} else {
				res.status(404).json({ 
                        message: "The post with the specified ID does not exist" 
                    });
			}
		})
		.catch((err) =>
			res.status(500).json({ 
                error: "The post could not be removed" 
            })
		);
});


module.exports = router; 