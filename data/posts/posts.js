const express = require("express")
const posts = require("./db")

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
        }else{
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            errorMessage: "The post information could not be retrieved."
        })
    })
})
