const express = require('express');

const router = express.Router();

const Post = require('./data/db');

router.post('/api/posts', (req, res) => {
    
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
        return 
    } else {
    
    Post.insert(req.body)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
    })

        
    }

})

router.post('/api/posts/:id/comments', (req, res) => {
    if (!req.body.text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
        return
    }
    const newComment = {post_id: req.params.id, created_at: new Date(), updated_at: new Date(), text: req.body.text}
    try {
    Post.insertComment(newComment)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message: "The post with the specified ID does not exist."
        })
    })
} catch (error) {
    res.status(500).json({
        error: "There was an error while saving the comment to the database"
    })
}
})

module.exports = router;