const express = require("express");
const posts = require("./posts-model");

// stand alone router
const router = express.Router();

// POST /api/posts
router.post("/api/posts", (req, res) => {
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

// POST /posts/:id/comments
// CHECK THIS LATER!!! 
router.post("/posts/:id/comments", (req, res) => {
    if (!posts.id) {
        return res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    }
    if (!req.params.text) {
        return res.status(400).json({
            message: "Please provide text for the comment."
        })
    }
    posts
        .insertComment(req.body)
        .then((comment) => {
            posts.findCommentById(comment.id)
            .then((comment) => {
                res.status(201).json(post)
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the comment to the database."
            })
        })
})

// GET /api/posts
router.get("/posts", (req, res) => {
    posts
        .find({
            sortBy: req.query.sortBy,
            limit: req.query.limit,
        })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                message: "The posts information could not be retrieved."
            })
        })
})

// GET /posts/:id
router.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    posts
        .findById(id)
        .then((post) => {
            if (post) {
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
                message: "The post information could not be retrieved."
            })
        })
})


module.exports = router;