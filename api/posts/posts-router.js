// implement your posts router here
const express = require('express');
const { post } = require('../server.js');

const router = express.Router();

const posts = require('./posts/posts-model.js');


//GET /api/posts
router.get('/', (req, res) => {
    post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "The post information could not be retrieved"
            });
        });

});


//GET /api/posts/:id
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)

        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The post information could not be retrieved"
            });
        });
});


//POST /api/posts
router.post('/', (req, res) => {
    const newPost = req.body
    if(!newPost.title || !newPost.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        });
    }else {
        Post.insert(req.body)
            .then(p => {
                res.status(201).json(p);
            })
            .catch(e => {
                console.log(e)
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
                });
            });
    }
});


//PUT /api/posts/:id
router.put('/:id', (req, res) => {
    const changes = req.body
    Post.update(req.params.id, changes)
        .then(p => {
            if(!changes.title || !changes.contents){
                res.status(400).json({
                    message: "Please provide title and contents for the post"
                })
            }else if(p) {
                res.status(200).json(p)
            }else {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist"
                    })
            }
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
})

//DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(p => {
            if(!p) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }else {
                res.json(p)
            }
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({
                message: "The post could not be removed"
            })
        })
});

//GET /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(c => {
            if(c){
                res.status(200).json(c)
            }else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
});