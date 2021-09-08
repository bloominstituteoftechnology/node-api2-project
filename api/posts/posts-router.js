// implement your posts router here

const Post = require("./posts-model.js");
const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.get("/:id", (req, res) => {
    const  id  = req.params.id
    Post.findById(id)
    .then(post => {
        if(!post){
            res.status(404).json('The post with the specified id does not exist')
        } else {
            res.json(post)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post("/", (req, res) => {
    const newPost = req.body
    if(!newPost){
        res.status(422).json('Please provide title and contents for post.')
    } else {
        Post.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        if(!updates.title || !updates.contents){
            res.status(422).json({ message: 'needs title and contents' })
        } else {
            const updatedPost = await Post.update(id, updates)
            if(!updatedPost){
                res.status(404).json({ message: 'post does not exist' })
            } else {
                res.status(200).json(updatedPost)
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deletedPost = await Post.remove(id)
        if(!deletedPost){
            res.status(404).json('User not found')
        } else {
            res.status(200).json(deletedPost)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:id/comments", (req, res) => {
    try {
        const id = req.params.id
        Post.findCommentById(id)
        .then((comment) => {
            if(!comment){
                res.status(404).json('No comments not found')
            } else {
                res.status(200).json(comment)
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router 