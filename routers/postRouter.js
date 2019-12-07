const express = require('express')
const db = require('../data/db')
const router = express.Router()

router.get('/', (req, res) => {
    db.find()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(001).json({ message: 'My error' })
    })
})

router.post('/', (req, res) => {
    const body = req.body
    if(!body.title || !body.contents) {
        res.status(400).json({ message: 'Post must include a title and contents' })
    } else {
        db.insert(req.body)
        .then((result) => {
            res.status(201)
            db.findById(result.id)
            .then((post) => {
                res.json(post)
            })
        })
        .catch((err) => {
            res.status(500).json({ message: 'There was an error while trying to save your post' })
        })
    }
})

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        res.status(200).json(post)
    })
    .catch((err) => {
        res.status(404).json({ message: 'This post does not exist' })
    })
})

router.delete('/:id', (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        db.remove(post[0].id)
        .then((result) => {
            res.status(204).json(result)
        })
        .catch((err) => {
            res.status({ message: 'The post could not be removed' })
        })
    })
    .catch((err) => {
        res.status(404).json({ message: 'The post with the specified ID does not exist' })
    })
})

router.put('/:id', (req, res) => {
    db.find(req.params.id)
    if(!req.params.id) {
        res.status(400).json({ message: 'No post found matching suggested ID' })
    } else if(!req.body.title || !req.body.contents) {
        return res.status(400).json({ message: 'Post requires a title and contents' })
    } else {
        db.update(req.params.id, req.body)
        .then((result) => {
            db.findById(req.params.id)
            .then((post) => {
                res.status(200).json(post)
            })
        })
        .catch((err) => {
            res.status(500).json({ message: 'There was an error updating the post' })
        })
    }
})

module.exports = router