// implement your posts router here
const Post = require('./posts-model')
const express = require('express')

const router = express.Router()

// POSTS ENDPOINTS
router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `${err}` })
        })
})

router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: 'Please provide title and contents for the post' })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Post.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `${err}` })
        })
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The post with the specified ID has been deleted' })
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `${err}` })
        })
})

router.get('/:id/comments', (req, res) => {
    Post.findCommentById(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `${err}` })
        })
})

module.exports = router;