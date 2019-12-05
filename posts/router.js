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
                db.findById(response.id)
                    .then(post => res.status(201).json(post))
                 // come back and make sure entire post is returned
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
        .then(post => {
            if(post.id){
                if (!comment.text) {
                    res.status(400).json({ errorMessage: "Please provide text for the comment."})
                } else {
                    db.insertComment(comment)
                        .then(response => {
                            db.findCommentById(response.id)
                                .then(newComment => res.status(201).json(newComment))
                            })
                        .catch(error => {
                            res.status(500).json({errorMessage: "There was an error while saving the comment to the database"})
                        })
                }
            } else {
                res.status(404).json({ errorMessage: "The post with the specified post does not exist"})
            }
        })
})

router.get('/', (req, res) => {
    db.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The posts information could not be retrieved"})
        })
})

router.get('/:id', (req, res) =>{
    const id = req.params.id

    db.findById(id)
        .then(post => {
            if (post[0]) {
                res.status(200).json(post)
            } else {
                res.status(404).json({errorMessage: "The post with the specified id does not exist"})
            }
            
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The post information could not be retrieved"})
        })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    db.findById(id)
        .then(post => {
            if (post[0]){
                db.findPostComments(id)
                    .then(comments => res.status(200).json(comments))
            } else {
                res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The comments information could not be retrieved"})
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    db.findById(id)
        .then(post => {
            if(post[0]){
                db.remove(id)
                    .then(response => res.status(200).json(post))
                    .catch(error => {
                        res.status(500).json({errorMessage: "The post could not be removed"})
                    })
            } else {
                res.status(404).json({ errorMessage: "The post with the specified ID does not exist."})
            }
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedPost = req.body

    db.findById(id)
        .then(post => {
            if (post[0]){
                if (!updatedPost.title || !updatedPost.contents){
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
                } else {
                    db.update(id, updatedPost)
                        .then(response => {
                            db.findById(id)
                                .then(newPost => res.status(200).json(newPost))
                        })
                        .catch(error => {
                            res.status(500).json({errorMessage: "The post information could not be modified."})
                        })
                }
            } else {
                res.status(404).json({ errorMessage: "The post with the specified ID could not be found"})
            }
            
        })
})


module.exports = router