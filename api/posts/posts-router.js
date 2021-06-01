// implement your posts router here
const express = require('express')
// const db = require('../../data/db-config');
const router = express.Router()

const Posts = require('./posts-model')

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        console.log(res)
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    
    Posts.findById(id)
    .then(post => {
        console.log(res)
        if(!post) {
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "The post information could not be retrieved"})
    })
})

router.post('/', (req, res) => {
    const newPost = req.body
    Posts.insert(newPost)
    .then(post => {
        if(!post) {
            res.status(404).json({ message: "Please provide title and contents for the post" })
        } else {
            console.log(res)
            res.status(201).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newPost = req.body
    
    try {
        if(!newPost.title || !newPost.contents) {
            res.status(404).json({ message: "Please provide title and contents for the post" })
        } else {
            const updatedPost = await Posts.update(id, newPost)
                if(!updatedPost) {
                    res.status(404).json({ message: "The post with the specified ID does not exist" })
                } else {
                    try {
                        console.log(updatedPost)
                        res.status(200).json(updatedPost)
                    }
                    catch {
                        res.status(500).json({ message: "The post information could not be modified" })
                    }
                }
            
        }
    } catch (err) {
        res.status(500).json({ message: "The post information could not be modified" })
    }
}) 

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const deletedPost = await Posts.remove(id)
        if(!deletedPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(deletedPost)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
    
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id

    if(!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        Posts.findPostComments(id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The comments information could not be retrieved" })
        })
    }
})

router.use('*', (req, res) => {
    res.status(200).json({ message: 'hello world!'})
})

module.exports = router