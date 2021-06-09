// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

//GET posts (read)
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
});

//GET posts by ID
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved."
            })
        })
});

//POST (create)
router.post('/', (req, res) => {
    const body = req.body;
    if (!body.title || !body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
       Posts.insert(body)
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
    }
});

// PUT (update)
router.put('/:id', async (req, res) => {
    const lookupPost = await Posts.findById(req.params.id)
    if (!lookupPost) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    } else {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            try {
                const updatedPost = await Posts.update(req.params.id, req.body);
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json({
                    message: "The post information could not be modified"
                })
            }
        }
    }
});

router.delete('/:id',);

router.get('/:id/comments',);


module.exports = router;