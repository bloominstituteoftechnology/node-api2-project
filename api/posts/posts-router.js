// implement your posts router here
const express = require("express");

const router = express.Router();

const Posts = require("./posts-model")

//Posts endpoints

router.get("/", (req, res) => {
    Posts.find(req.body)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the posts"
        })
    })
})

router.get("/:id", (req,res))

module.exports = router