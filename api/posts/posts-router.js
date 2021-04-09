// implement your posts router here
const express = require("express");
const posts = require("./posts-model");

const router = express.Router();

//endpoint that returns an array of all the posts in the database
router.get("/api/posts", (req, res) => {
    posts.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(() => {
            res.status(500).json({ message: "The posts information could not be retrieved" });
        })
});

//endpoint that returns a post object of a specified ID
router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then(post => {
            if(post){
                res.json(post)
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
});
module.exports = router