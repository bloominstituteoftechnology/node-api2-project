// implement your posts router here
const express = require("express")
const posts = require("./posts-model")

const router = express.Router();

// GET all of the post objects
router.get("/api/posts", (req, res) => {
    posts
        .find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

// GET the post object with the specified id
router.get("/api/posts/:id", (req, res) => {
    posts
        .findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

// POST the information sent inside the request body and return the newly created post object
router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    posts
        .insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

// PUT (update) the post with the specified ID using data from the request body and return the modified document
router.put("/api/posts/:id", (req, res) => {
    if(!req.body.title || !req.body.contents) {
        return res.status(404).json({
            message: "Please provide title and contents for the post"
        })
    }
    posts  
        .update(req.params.id, req.body)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(400).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        }) 
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
})

// DELETE the post with the specified ID and return the deleted post object
router.delete("/api/posts/:id", (req, res) => {
    posts
        .remove(req.params.id)
        .then(post => {
            if (!post) {
                res.status(200).json({
                    message: "This post has been deleted"
                })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The comments information could not be"
            })
        })
})

// GET all the comments of the post with the specified ID
router.get("api/posts/:id/comments", (req, res) => {
    posts
        .findPostComments(req.params.id)
        .then(post =>{
            if (!postId) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(post)                
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})


module.exports = router