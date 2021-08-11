// implement your posts router here
const express = require('express')
const router = express.Router()
const post = require('./posts-model')


    // require your posts router and connect it here
server.post ('/api/posts', (req, res) => {

    post.add(req.body)
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch( err => {
        console.log(err);
        res.statusCode(500).json({
            message: 'Error adding the posts'
        })
    })



})

server.put('/api/posts/:id', (req, res) => {
    const changes = req.body
    post.update(req.params.id, changes)
    .then( post=> {
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
    } )
})


server.get(' /api/posts/:id ', (req, res) => {
    post.findById(req.params.id)
    .then(posts => {
        if (posts) {
            res.statusCode(200).json(posts)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})

server.get('/api/posts/:id/comments', (req, res) => {
    post.findCommentById(req.params.id)
    .then(comment =>{
        if (findPostComments.length>0) {
            res.status(200).json(comment);
        } else {
            res.status(404).json( {
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch( err => {
        console.log(error);
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})
//  complete delete request, break up apis
    server.delete('/api/posts/:id',(req, res) => {
        post.remove(req.params.id)
        .then( count => {
            if (count> 0 ) {
                res.status(200).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(404).json({
                    message: 
                })
            }
        })
    })


    module.exports = router
