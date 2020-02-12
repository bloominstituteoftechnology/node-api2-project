const express = require('express');

const posts = require('../data/db.js');

const router = express.Router({mergeParams: true});

//GET - Get all comments by post ID

router.get('/', (req, res) => {
    const { id } = req.params;

    posts.findPostComments(id)
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

// POST - post a new comment to specific post id
//  if the post ID doesn't exist, return 404

router.post('/', (req, res) => {

  const { id } = req.params;

  if (!req.body.text) {
    res.status(400).json({errorMessage: "Please provide text for the comment."})
  } else {
    posts.insertComment({post_id: id, ...req.body})
    .then(comment => {
        if(comment === 0) {
            res.status(404).json({errorMessage: "could not find specified post"})
        } else {
            res.status(201).json({id: comment.id, post_id: id, ...req.body})
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: "could not add the comment"})
    })
  }
})





module.exports = router


