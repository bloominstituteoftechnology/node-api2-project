

const express = require('express')


const router = express.Router()
const Posts = require('./db.js')


router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `Sorry no POST/ here 500 ${err}`
        })
    })
})



router.post('/:id/comments', (req, res) => {
    const commentInfo = { ...req.body, post_id: req.params.id }
    Posts.insertComment(commentInfo)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch(err => {
        res.status(500).json({
            message: `Error While POST /:id/comments 500 ${err}`,
            err
        })
    })
})



router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: `Wont retrieve GET/ 500 ${err}`
        })
    })
})



router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `GET/:id 404 ${err}`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message:`GET/:id 500 ${err}`
        })
    })
})


router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `GET/:id/comments 404  ${req.params.id}`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `GET/:id/comments 500 ${err}`
        })
    })
})


router.put('/:id', (req, res) => {
    const changes = req.body
    Posts.update(req.params.id, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post)
            } else {
            res.status(404).json({
                message: `PUT/:id 404 ${req.body}`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `PUT /:id 500 ${err}`
        })
    })
})




router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(id => {
        if (id > 0) {
            res.status(200).json({
                message: `DELETE/:id 200 ${'id '+id+' ',req.body }`
            })
            } else {
            res.status(404).json({
                message: `DELETE/:id 404 ${'id '+id+' ',req.body }`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `DELETE/:id 500 ${'err '+err,req.body }`
        })
    })
})

module.exports = router