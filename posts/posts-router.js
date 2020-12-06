const express = require('express')

const posts = require('./db')

const router = express.Router()

router.get('/',(req,res) => {
    posts.find(req.body)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(404).json({
            message: "The posts info could not be found"
        })
    })
})

router.get('/:id', (req,res) => {
    posts.findById(req.params.id)
    .then((posts) => {
        if(posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    })
})
module.exports = router