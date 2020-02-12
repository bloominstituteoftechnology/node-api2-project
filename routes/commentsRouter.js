const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    //get all comments for post
    const { id } = req.params;

    Posts.findPostComments(id)
    .then( comments => {
        if(comments.length === 0) {
            res.status(404).json({errorMessage: "The specified post could not be found."})
        } else {
            res.status(200).json(comments);
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: "Could not get comments for specified posts."})
    })
})

router.post('/', (req, res) => {

    // post a new comment to specific post id
    const { id } = req.params;

    Posts.insertComment({post_id: id, ...req.body})
    .then( comId => {
        if(comId === 0) {
            res.status(404).json({errorMessage: "could not find specified post"})
        } else {
            res.status(201).json({id: comId.id, post_id: id, ...req.body})
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: "could not add the comment"})
    })

})


