// implement your posts router here

const express = require("express")
const posts = require("./posts-model")

const router = express.Router()

router.get("/api/posts", (req, res) => {
    posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

router.post("/api/posts", (req, res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    posts.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
                })
            })
})

router.put("http://localhost:4000/api/posts/:id", (req, res) => {
    if(!req.params.id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    } 
    
    posts.update(req.params.id, req.body)
        .then(post => {
            if(!req.body.title || !req.body.contents){
                res.status(400).json({
                    message: "Please provide title and contents for the post"
                })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
})

router.delete("http://localhost:4000/api/posts/:id", (req, res) => {
    if(!req.params.id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }

    posts.remove(req.params.id)
        .then(post => {
            res.status(200).json({
                message: "The post has been deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The post could not be removed"
            })
        })
})

router.get("http://localhost:4000/api/posts/:id/comments", (req, res) => {
    if(!req.params.id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }

    posts.findPostComments(req.params.id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = router