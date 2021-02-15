const express = require("express")
const posts = require("./posts-model")
const router = express.Router()

router.get("/posts", async (req, res) =>{
   await posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get("/posts/:id", async (req, res) =>{
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
    await posts.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        }
    })
})

router.post("/posts", async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

   await posts.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

router.put("/posts/:id", async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    await posts.update(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be modified."
            })
        })
})

router.delete("/posts/:id", async (req, res) => {
    await posts.remove(req.params.id)
        .then((post) => {
            if (post) {
                res.status(202).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specific ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The post could not be removed :("
            })
        })
})

router.get("/posts/:id/comments", async (req, res) => {
    await posts.findPostComments(req.params.id)
        .then((comments) => {
            if (!comments) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(comments)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = router;