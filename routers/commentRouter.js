const express = require('express')
const db = require('../data/db')
const router = express.Router({
    mergeParams: true
})

router.get('/', (req, res) => {
    db.findById(req.params.id)
    .then((result) => {
        db.findPostComments(req.params.id)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server could not find post, please try again' })
        })
    })
    .catch((err) => {
        res.status(404).json({ message: 'The post with the specified ID does not exist' })
    })
})

router.post('/', (req, res) => {
    db.findById(req.params.id)
    .then((result) => {
        if(!req.body.text) {
            res.status(400).json({ message: 'Text is required' })
        } else {
            db.insertComment(req.body)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                res.status(500).json({ message: 'Server could not save comment, please try again' })
            })
        }
    })
    .catch((err) => {
        res.status(404).json({ message: 'A post could not be found matching that ID' })
    })
})

module.exports = router