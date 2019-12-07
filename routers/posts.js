const express = require ('express')
const commentRouter = require('./comments')
const db = require('../data/db')
const router = express.Router()

// let db = require('./comments') 
// const app = express()
// app.use(express.json())

router.use('/:id/comments', commentRouter)

router.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ message: "The posts information could not be retrieved." })
        })
})  

router.get("/api/posts/:id", (res, req) => {
    db.findById(req.params.id)
        .then(id => {
            if (id) {
              res.json(id)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get("/api/posts/:id/comments", (res, req) => {
    db.insert()
    .then(posts => {
        if(id) => {
            res.json(posts)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.