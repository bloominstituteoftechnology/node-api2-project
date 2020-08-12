const express = require('express');
const posts = require('../data/db');

const router = express.Router();

router.post('/posts', (req, res) => {
    if(!req.body.title || ! req.body.contents){
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } 
    posts.insert(req.body)
        .then((posts) => {
            res.status(201).json(posts)
        })
        .catch((error) => {
            res.status(500).json({
                error: "There was an error while saving the post to the database" 
            })
        })
});

router.get('/posts', (req,res) => {
    posts.find(req.query)
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the posts",
        });
    });
});

router.get('/posts/:id', (req, res) => {
    posts.findById(req.params.id)
        .then((posts) => {
            if(posts.length > 0 ){
                res.status(200).json(posts);
            } else {
                res.status.apply(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be retrieved." 
            })
        })
})

router.put('/posts/:id', (req, res) => {
    if(!req.body.title || ! req.body.contents){
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } 
    posts.update(req.params.id, req.body)
        .then((posts) => {
            console.log("this is the post", posts)
            if(posts){
                res.status(200).json(posts)
            } else {
                console.log("this is the post", posts)
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be modified."  
            })
        })
})

router.delete('/posts/:id', (req, res) => {
    posts.remove(req.params.id)
        .then((posts) => {
            if(posts > 0 ){
                res.status(200).json({
                    message: "Post is deleted"
                })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: "The post could not be removed" }   
            )
        })
})


module.exports = router;