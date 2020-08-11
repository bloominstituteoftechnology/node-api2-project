const express = require("express")
const posts = require("../db")

const router = express.Router()

router.get("/posts", (req, res) => {
    posts.find(req.query)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            errorMessage: "The posts information could not be retrieved."
        })
    })
})

router.get("/posts/:id", (req,res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            }else {
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                errorMessage: "The post information could not be retrieved."
            })
        })
    })


router.get("/posts/:id/comments", (req,res) => {
    if (!req.params.id) {
        return res.status(404).json({
            errorMessage: "The post with the specified ID does not exist."
        })
    }
    posts.findPostComments(req.params.id)
    .then((comments) => {
        res.json(comments)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            errorMessage: "The comments information could not be retrieved."
        })
    })
})

router.post("/posts", (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide a title and contents for the post."
        })
    }

    posts.insert(req.body)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error while saving the post to the database."
        })
    })
})

router.post("/posts/:id/comments", (req,res) => {
    users.insertComment(comment)
    if (!req.params.id) {
        return res.status(404).json({
            errorMessage: "The post with the specified ID does not exist."
        })
    }

    if (!req.params.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment"
        })
    }

    posts.insertComment(req.body)
    .then((comment) => {
        res.status(201).json(comment)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error while saving the comment to the database."
        })
    })
})

router.delete("/posts/:id", (req,res) => {
    posts.remove(req.params.id)
        .then((id) => {
            if (id > 0) {
                res.status(200).json({
                    message: "The post has been deleted."
                })
            }else{
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                errorMessage: "The post could not be removed."
            })
        })
})

router.put("/posts/:id", (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    posts.update(req.params.id, req.body)
    .then((post) => {
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            errorMessage: "The post information could not be modified."
        })
    })
})

module.exports = router