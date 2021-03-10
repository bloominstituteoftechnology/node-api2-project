// implement your posts router here
const Posts = require('./posts-model');
const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    Posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            res.status(500).json({ message: `${err.message}` })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    Posts.findById(id)
        .then((posts) => {
            if (!posts) {
                res.status(404).json({ message: `post with id ${id} does not exist` })
            } else {
                res.status(200).json(posts)
            }
        })
        .catch((err) => {
            res.status(500).json({ message: `get error: ${err}` })
        })
})

router.post('/', async (req, res) => {
    const post = await Posts.insert(req.body)
    if (!post) {
        res.status(400).json({ message: `${post} not found` })
    } else {
        res.status(201).json(post)
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Posts.remove(id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            res.status(500).json({ message: `${err}` })
        })
})

router.get('/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {res.status(500).json({ message: `${err}` })})
})

module.exports = router