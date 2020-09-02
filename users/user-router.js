const express = require('express')
const router = express.Router();
const db = require('../data/db.js')
const { find, insert } = require('../data/db')

router.post('/', (req, res) => {
    db.insert(req.body)
        .then((body) => {
            res.status(200).json(body)
        })
        .catch((error) => {
            res.status(500).json({error, message: "Error adding post."})
        })
    })

router.post('/:id/comments', (req, res) => {
    const id = Number(req.params.id)
    db.insertComment()
})

// router.get('/', (req, res) => {
//     db.find()
//     .then((db) => {
//         res.status(200).json(db)
//     })

    
router.get('/:id/comments', (req, res) => {
    const id = (req.params.id)
    db.findPostComments(id)
        .then((comment) => {
            res.status(200).json(comment)
        })

})

module.exports = router
