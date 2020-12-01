const express = require('express');
const Post = require('../../data/db')

const router = express.Router();

router.get('/', (req, res) => {

    const { query } = req
    Post.find(query)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(404).json(error.message)
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Post.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    Post.findPostComments(id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })


})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    Post.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })

})

router.post('/:id/comments', (req, res) => {
    const { id } = req.params
    const text = req.body

    if (!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    Post.insertComment(text)
        .then(comment => {

            res.status(200).json(comment)

        })
        .catch(error => {
            console.log(error.message)
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const dPost = req.body
    Post.remove(id)
        .then(post => {
            if (post) {
                res.status(200).json(dPost)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).json({ error: "The post could not be removed" })
        })
})

router.put('/:id', (req, res) => {
    const change = req.body;
    const { id } = req.params
    Post.update(id, change)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            }
            else {
                res.status(404), json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be modified." })
        })
})

module.exports = router