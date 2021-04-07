// implement your posts router here
const Post = require('./posts-model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            console.log(`here are your posts: ${posts}`);
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(!post) {
                console.log('post does not exist')
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }else {
                console.log(`here is your post: ${post}`)
                res.status(200).json(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

router.post('/', (req, res) => {
    const newPost = req.body;
    if(!newPost.title || !newPost.contents) {
        console.log('title and/or contents needed')
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }else {
    Post.insert(newPost)
        .then(post => {
            console.log(`here is your new post: ${post}`)
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body

    try{
        if(!changes.title || !changes.contents) {
            console.log('title and/or contents needed')
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        }else {
            const updatedPost = await Post.update(id, changes)
                if(!updatedPost) {
                    console.log('post does not exist')
                    res.status(404).json({
                        message: "The post with the specified ID does not exist"
                    })
                }else {
                    console.log(`here is your updated post: ${updatedPost}`)
                    res.status(200).json(updatedPost)
                }
        }
    }catch(err) {
        console.log('post could not be updated')
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try{ 
        const deletedPost = await Post.remove(id)
        if(!deletedPost) {
            console.log('post does not exist')
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }else {
            console.log('post deleted')
            res.status(200).json(deletedPost)
        }
    }catch(err) {
        console.log('could not remove post')
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})

router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(post => {
            if(!post) {
                console.log('post does not exist')
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }else {
                console.log(post)
                res.status(200).json(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = router;