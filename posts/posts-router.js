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

router.get('/:id/comments', (req,res) => {
    posts.findPostComments(req.params.id)
    .then((posts) => {
        if(posts){
            res.status(200).json(posts)
        } else {
            res.status(404).json({
                message: " The post with the ID does not exist"
            })
        }
    })
    .catch(() =>{
        res.status(500).json({
            message: "The comments could not be found"
        })
    })
})

router.put('/:id', (req,res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    posts.update(req.params.id, req.body)
    .then((posts) => {
        if(posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({
                message: "Post with the ID does not exist"
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    })
})
module.exports = router