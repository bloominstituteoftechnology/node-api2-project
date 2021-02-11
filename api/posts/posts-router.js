// implement your posts router here
const Post = require('./posts-model');

const express = require('express');

const router = express.Router();

router.get('/api/posts', (req, res) => {
   Post.find(req.query)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            console.log(err)
            res
                .status(500)
                .json({message: 'The posts information could not be retreived'})
        });
});

router.get('/api/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json(post);
            } else {
                res.status(404).json({message:'The post with the specified ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'The post information could not be retrieved'});
        });
});

router.get('/api/posts/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(comments => {
            if(comments){
                res.status(200).json(comments);
            } else {
                res.status(404).json({message:'The post with the specified ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'The comments information could not be retrieved'});
        });
});

router.post('/api/posts', (req, res) => {
    const {title, contents} = req.body

    if (!title || !contents) {
        res.status(400).json({message: 'Please provide title and contents for the post'})
    }

    Post.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'There was an error while saving the post to the database'})
        });
});

router.put('/api/posts/:id', (req, res) => {
    const { title, contents, changes } = req.body;

    if (!title || !contents) {
        res.status(400).json({message: 'Please provide title and contents for the post'})
    }

    Post.update(req.params.id, changes)
        .then(post => {
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'The post information could not be modified'
            });
        });
});

router.delete('/api/posts/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: 'The post has been removed'})
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'The post could not be removed'
            });
        });
});

module.exports = router