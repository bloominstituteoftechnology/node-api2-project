// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "The posts information could not be retrieved"
        });
    });
});

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
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    })
})

router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body
        if (!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post"})
        } else {
            const idObj = await Post.insert({ title, contents })
            const post = await Post.findById(idObj.id)
            res.status(201).json(post)
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const possiblePost = await Post.findById(req.params.id)
        if (!possiblePost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            if (!req.body.title || !req.body.contents) {
                res.status(400).json({
                    message: "Please provide title and contents for the post"
                })
            } else {
                await Post.update(
                    req.params.id,
                    req.body
                );
                const updatedPost = await Post.findById(req.params.id)
                res.status(200).json(updatedPost)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const possiblePost = await Post.findById(req.params.id)
        if (!possiblePost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Post.remove(req.params.id)
            res.status(200).json(possiblePost)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const possiblePost = await Post.findById(req.params.id)
        if (!possiblePost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const comments = await Post.findPostComments(req.params.id)
            res.status(200).json(comments)
        }
    } catch (err) {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    }
})

module.exports = router;