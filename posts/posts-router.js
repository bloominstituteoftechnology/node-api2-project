// imports
const express = require('express');
const Posts = require('../data/db');

// router creation
const router = express.Router();

// endpoints

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})


router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json(post);
            }
            else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})


router.get('/:id/comments', (req, res) => {
   Posts.findPostComments(req.params.id)
    .then(comments => {
        if(comments){
            res.status(200).json(comments)
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
});

router.post('/', (req, res) => {
    const post = req.body;

    if(!post.title || !post.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        try{
            Posts.insert(post)
            res.status(201).json(post)
        }
        catch{
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    }
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id
   const comment = req.body;
    comment.post_id = Number(id);
    if(!comment.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else{
        Posts.findPostComments(req.params.id)
            .then(comments => {
                if(comments){
                Posts.insertComment(comment)
                res.status(201).json(comment)
                } else{
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
    }
})

router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            Posts.remove(req.params.id)
                .then(() => {
                    //deletedPost = posts.filter(post => post.id === Number(req.params.id));
                    res.status(200).json(post);
                })
                .catch(err =>{
                    console.log(err)
                    res.status(500).json({ error: "The post could not be removed" })
                })
        })
        .catch(err => {
            console.log(err)
            
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

router.put('/:id', (req, res) => {
    const update = req.body;
    const id = req.params.id;

    Posts.findById(id)
        .then(() => {
            if(!update.title || !update.contents){
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else{
                Posts.update(id, update)
                    .then(() => {
                        res.status(200).json(update)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ error: "The post information could not be modified." })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

// exports
module.exports = router;
