const express = require('express');
const comments = require('../data/db');

const router = express.Router();

router.post('/posts/:id/comments', (req, res) => {

    if(!req.body.text){
        return res.status(400).json({
            errorMessage: "Please provide text for the comment." 
        })
    } 
    comments.insertComment(req.body)
        .then((comments) => {
            if(comments){
                res.status(201).json(comments);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the comment to the database" 
            })
        })
})
router.get('/posts/:id/comments', (req, res) => {
    comments.findCommentById(req.params.id)
        .then((comments) => {
        if(comments){
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
        
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the posts",
            });
        });
})

module.exports = router;