// implement your posts router here
const Posts = require('./posts-model');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})

router.get('/:id', (req,res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist"})
            } else (
                res.status(200).json(post)
            )
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Ther post information could not be retrieved"})
        })
})

router.post('/', (req,res) => {
    Posts.insert(req.body)
        .then( post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "There was an error while saving the post to the database"})
        })
})

router.put('/:id', (req,res) => {
    Posts.update(req.params.id, req.body)
        .then(post => {
            if(post && post.title && post.contents) {
                res.status(200).json(post)
            } else if(!post.title || !post.contents) {
                res.status(400).json({message: 'Please provide title and contents for the post'})
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post information could not be modified"})
        }) 
})

router.delete('/:id', (req,res) => {
    Posts.remove(req.params.id)
        .then(post => {
            if(!post){
                res.status(404).json({message: "The post with the specified Id does not exist"})
            } else{
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post could not be removed"})
        })
})

router.get('/:id/comments', (req,res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            if(!comments) {
                res.status(404).json({message: 'The post with the specifed ID does not exist'})
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(err => {
            res.status(500).json({message: "The comments information could not be retrieved"})
        })
})