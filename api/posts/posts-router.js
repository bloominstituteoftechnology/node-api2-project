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

//endpoint that creates a post 
router.post("/api/posts", (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        posts.insert(req.body)
            .then(item => {
                posts.findById(item.id)
                    .then((post) => {
                        res.status(201).json(post)
                    })
                    .catch(() => {
                        res.status(500).json({ message: "There was an error while saving the post to the database" })
                    })
            })
            .catch(() => {
                res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
    }
});

//endpoint that updates the post of a specified id and returns the updated post
router.put("/api/posts/:id", (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        posts.update(req.params.id, req.body)
            .then((count) => {
                if(count >= 1){
                    posts.findById(req.params.id)
                    .then((post) => {
                        res.status(201).json(post)
                    })
                    .catch(() => {
                        res.status(500).json({ message: "There was an error while saving the post to the database" })
                    })
                }
                else{
                    res.status(404).json({ message: "The post with the specified ID does not exist" })
                }
            })
            .catch(() => {
                res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
    }
});

//endpoint that deletes a post
router.delete("/api/posts/:id", async (req,res) => {
    await (posts.findById(req.params.id))
    .then((data) => {
        posts.remove(req.params.id)
        .then(count => {
            if(count >= 1){
                res.status(200).json(data)
            }
            else{
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
    })
    .catch(() => {
        res.status(500).json({ message: "The post could not be removed" })
    })
})
module.exports = router