// implement your posts router here

const express = require('express');

const router = express.Router();

const Post = require('./posts-model');

router.get('/', (req, res) => {
    Post.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(posts => {
        if(posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({ message:'The post with the specified ID does not exist'})
        }
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

router.post('/', (req, res) => {
    const {title, contents} = req.body

    if(!title || !contents){
        res.status(400).json({ message: 'Please provide title and contents for the post'})
    } else {
       Post.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const changes = req.body

    try {
        if(!changes.title || !changes.contents) {
            res.status(400).json({ message: 'Please provide title and contents for the post'})
        } else {
            const updatedPost = await Post.update(id, changes)
            if(!updatedPost) {
                res.status(404).json({ message: 'The post with the specificed ID does not exist'})
            } else {
                console.log(updatedPost)
                res.status(200).json(updatedPost)
            }
        }
    } catch(err) {
        res.status.json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Post.remove(req.params.id)
        if(!deleted) {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else {
            res.json(deleted);
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Post.findPostComments(id)
    .then(posts => {
        if(!posts) {
            res.status(404).json({ message: 'The post with the specified ID does not exist'})
        } else {
            console.log(posts)
            res.status(200).json(posts)
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

module.exports = router;