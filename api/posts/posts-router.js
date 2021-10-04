// implement your posts router here
const post = require('./posts-model')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    post.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ message: 'The posts information could not be retrieved' })
        })
})

router.get('/:id', (req, res) => {
    post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The post information could not be retrieved' })
        })
})

router.post('/', (req, res) => {
    post.insert(req.body)
        .then(post => {
            if (!post.title || !post.contents) {
                res.status(400).json({ message: 'Please provide title and contents for the post' })
            } else {
                res.status(201).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error while saving the post to the database' })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    post.update(req.params.id, changes)
        .then(post => {
            if (!post.id) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            } else {
                if (!post.title || !post.contents) {
                    res.status(400).json({ message: 'Please provide title and contents for the post' })
                } else {
                    res.status(200).json(post)
                }
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The post information could not be modified' })
        })
})

router.delete('/:id', (req, res) => {
    post.remove(req.params.id)
        .then(post => {
            if (!post.id) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            } else {
                res.status(200).json({ message: 'post has been deleted' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The post could not be removed' })
        })
})

router.get('/:id/comments', (req, res) => {
    post.findPostComments(req.params.id)
        .then(comments => {
            if (!comments.id) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The comments information could not be retrieved' })
        })
})

module.exports = router