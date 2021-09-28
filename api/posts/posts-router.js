// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');
const router = express.Router();

// [GET] /api/posts
// Returns an array of all the post objects contained in the database
router.get('/', (req, res) => {
    Posts.find()
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(500).json({
                message:"The posts information could not be retrieved"
            })
        })
});

// [GET] /api/posts/:id
// Returns the post object with the specified id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
        .then(post => {
            if(!post){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

// [POST] /api/posts
// Creates a post using the information sent inside the request body and returns the newly created post object


// [PUT] /api/posts/:id
// Updates the post with the specified id using data from the request body and returns the modified document, not the original


// [DELETE] /api/posts/:id	
// Removes the post with the specified id and returns the deleted post object


// [GET] /api/posts/:id/comments
// Returns an array of all the comment objects associated with the post with the specified id



module.exports = router;