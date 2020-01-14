const express = require('express');

const Hubs = require('../data/db.js');

const router = express.Router();

//ok
router.get('/', (req, res) => {
    Hubs.find()
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(err => {
        res.status(500).json({message: 'Error retrieving posts'})
    })
})
//ok
router.get('/:id', (req, res) => {
    Hubs.findById(req.params.id)
    .then(hub => {
        if(hub.length === 0){
            res.status(404).json({message: 'Post not found'})
        }else{
            res.status(200).json(hub);
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding post'})
    })
})

router.post('/', (req, res) => {
    Hubs.insert(req.body)
    .then(hub => {
        if(req.body.title && req.body.contents !== ''){
            res.status(201).json(hub)
        }else{
            res.status(400).json({message: 'Please provide title and contents for the post'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error adding a post'})
    })
})

router.put('/:id', (req, res) => {
    Hubs.update(req.params.id, req.body)
    .then(hub => {
        if(hub.length === 0){
            res.status(404).json({message: 'Post not found'})
        }else if(req.body.title === ''){
            res.status(400).json({message: 'Please provide title and contents for the post'})
        }else if(req.body.contents === ''){
            res.status(400).json({message: 'Please provide title and contents for the post'})            
        }else{
            res.status(200).json(hub)
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error updating post'})
    })
})
//ok
router.delete('/:id', (req, res) => {
    Hubs.remove(req.params.id)
    .then(hub => {
        console.log(hub)
        if(hub === 0){
            res.status(404).json({message: 'Post not found'})
        }else{
            res.status(200).json({message: 'Post has been deleted'})
        }
    })
    .catch(err=> {
        res.status(500).json({message: 'Error deleting post'})
    })
})

router.post('/:id/comments', (req, res) => {
    Hubs.insertComment(req.body)
    .then(hub => {
        if(hub.length === 0){
            res.status(404).json({message: 'Post not found'})
        } else if (req.body.text === ''){
            res.status(400).json({Message: "Please provide text for the comment." })
        }else{
            res.status(201).json(hub)
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Error creating comment'})
    })
})
//ok
router.get('/:id/comments', (req, res) => {
    Hubs.findCommentById(req.params.id)
    .then(hub => {
        console.log(hub)
        if(hub.length === 0){
            res.status(404).json({message: 'Post not found'})
        }else{
            res.status(200).json(hub)
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding comment'})
    })
})
module.exports = router;