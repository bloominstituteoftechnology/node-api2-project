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

module.exports = router