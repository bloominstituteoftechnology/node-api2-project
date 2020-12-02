const express = require('express')
const Database = require('./db.js')

const router = express.Router()

router.post('/api/posts', (req, res) => {
    const postFromClient = req.body
    Database.insert(postFromClient)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            });
        });
})

router.post('/api/posts/:id/comments', (req, res) => {
    const commentFromClient = req.body
    console.log(req.body)
    Database.insertComment(commentFromClient)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            });
        });
})

router.get('/api/posts', (req, res) => {
    Database.find(req.query)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})

router.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    Database.findById(id)
    .then(data => {
        if (data.length >= 1) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "Post could not be found with this id: " + id })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "the post information could not be retrieved"})
    })
})

router.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params
    Database.findCommentById(id)
    .then(data => {
        if (data.length >= 1) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "Post could not be found with this id: " + id })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "The comments information could not be retrieved." })
    })
})

router.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params
    Database.remove(id)
    .then(data => {
        if(data) {
            res.status(204).json({ message: data + " item deleted" })
        } else {
            res.status(404).json({ message: "Post does not exist with id: " + id})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "The post could not be removed" })
    })
})

router.put('/api/posts/:id', (req, res) => {
    const changes = req.body
    const { id } = req.params
    Database.update(id, changes)
    .then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "The post information could not be modified." })
    })

})


module.exports = router