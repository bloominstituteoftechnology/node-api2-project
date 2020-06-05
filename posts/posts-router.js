const express = require("express");
const posts = require("./posts-model");

// stand alone router
const router = express.Router();

// POST /posts
router.post("/posts", (req, res) => {
    if (!req.body.title  || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post."
        })
    }
    posts
        .insert(req.body)
        .then((post) => {
            posts.findById(post.id)
            .then((post) => {
                res.status(201).json(post)
            })
        })

        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "There was an error while saving the post to the database."
            })
        })
})

module.exports = router;