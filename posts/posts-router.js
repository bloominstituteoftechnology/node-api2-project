const express = require('express');
const router = express.Router();
const Posts = require('./posts-model.js');
const { json } = require('express');

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        req.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The posts information could no be retreived."
        });
    });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(500).json.apply({
                error: "The postinformation could not be retrieved"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            message: "the post witht he specified ID does not exist."
        });
    });
});

router.get('/:id/comments', (req, res) => {
    Posts.findCommentsById(req.params.id)
    .then(comments => {
        if(comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The comments information could not be retrieved."  
        });
    });
});



module.exports = router;