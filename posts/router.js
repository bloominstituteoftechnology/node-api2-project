const express = require('express');

const db = require('../data/db.js');

const router = express.Router();

router.use(express.json());

// post - /api/posts - needs title and content in req body
router.post('/', (req,res) => {
    const post = req.body
    
    if (!post.title || !post.contents) {
        res.status(400).json({errorMessage: "Please provede title and contents for the post"})
    } else {
        db.insert(post)
            .then(response => {
                res.status(201).json(response) // come back and make sure entire post is returned
            })
            .catch(error => {
                res.status(500).json({errorMessage: "There was an error while saving the post to the database"})
            })
    }
})

// post - /api/posts/:id/comments - needs text property
router.post('/:id/comments', (req, res) => {
    const id = req.body.post_id
    const comment = req.body

    db.findById(id)
        .then(response => {
            if (response.id !== id){
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist"})
            } else {
                if (!comment.text) {
                    res.status(400).json({ errorMessage: "Please provide text for the comment."})
                } else {
                    db.insertComment(comment)
                        .then(response => {
                            res.status(201).json(response) // come back and make sure comment object is returned
                         })
                        .catch(error => {
                            res.status(500).json({errorMessage: "There was an error while saving the comment to the database"})
                        })
                }
            }
        })
    
})


module.exports = router