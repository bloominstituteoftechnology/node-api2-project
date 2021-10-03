// implement your posts router here
const Post = require('./posts-model.js')
const express = require('express')

const router = express.Router()
router.get('/', (req, res) => {
    Post.find(req)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: 'The posts information could not be retrieved'})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params.id
    Post.findById(id)
    .then(post => {
        if(!post) {
            res.status(400).json({message: 'The post with the specified id does not exist'})
        }else{
            res.json(post)
        }
    })
    .catch(err => {
        res.status(500).json({message: 'The post information could not be retrieved'})
    })
})

router.post('/', (req, res) => {
    const newPost = req.body
    if(!newPost) {
        res.status(400).json({message: 'Please provide title and contents for post'})
    }else{
        Post.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({message: 'There was an error while saving the post to the database'})
        })
    }
})

router.put('/', async (req, res) => {
    const {id} = req.params.id
    const updates = req.body
    try{
        if(!updates.title || !updates.contents){
            res.status(422).json({message: 'needs title and contents'})
        }else{
            const updatedPost = await Post.update(id, updates)
            if(!updatedPost){
                res.status(404).json({message: 'The post information could not be motified'})
            }else{
                res.status(200).json(updatedPost)
            }
        }
    }catch(err){
        res.status(500).json({message: 'The post information could not be modified'})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params.id
        const deletedPost = await Post.remove(id)
        if(!deletedPost){
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }else{
            res.status(200).json(deletedPost)
        }
    }catch(err){
        res.status(500).json({message: 'The post could not be removed'})
    }
})

router.get('/:id/comments', (req, res) => {
    try{
        const {id} = req.params.id
        Post.findCommentById(id)
        .then((comment) => {
            if(!comment){
                res.status(404).json({message: 'The post with the specified ID does not exist'})
            }else{
                res.status(200).json(comment)
            }
        })
    }catch(err){
        res.status(500).json({message: 'The comments information could not be retrieved'})
    }
})

module.exports = router