const express = require("express")

const posts = require("./posts-model")
const router = express.Router()


router.get("/api/posts", (req, res) => {
    console.log(req.query)
    posts.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
})

router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
    .then((post) => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The post information could not be retrieved."  
        })
    })
})

router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post." 
        })
    }
    posts.insert(req.body)
    .then((posts) => {
        res.status(201).json(posts)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "There was an error while saving the post to the database" 
        })
    })

})

router.put("/api/posts/:id", (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post." 
        })
    }

    posts.update(req.params.id, req.body)
    .then((post) => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The post information could not be modified." 
        })
    })
})

router.delete("/api/posts/:id", (req,res) => {
posts.remove(req.params.id)
.then((count) => {
    if (count > 0) {
        res.status(200).json({
            message: "The user has been nuked",
        })
    } else {
        res.status(404).json({
            message: "The user could not be found",
        })
    }
})
.catch((error) => {
    console.log(error)
    res.status(500).json({
        message: "Error removing the user",
    })
})
})

module.exports = router 