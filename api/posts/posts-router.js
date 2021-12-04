const Posts = require('./posts-model.js')
const express = require('express')
const router = express.Router() 

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({err: err.message, message: 'Posts information could not be retrieved', stack: err.stack})
    })
})

router.get('/:id', async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id)
        if(!post){
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }else{
            res.json(post)
        }
    }catch(err){
        res.status(500).json({err: err.message, message: 'The post information could not be retrieved', stack: err.stack})
    }
})

router.post('/', (req, res) => {
    const {title, contents} = req.body
    if(!title || !contents){
        res.status(400).json({message: 'Please provide title and contents for the post'})
    }else{
        Posts.insert({title, contents})
        .then(({id}) => {
            return Posts.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({err: err. message, message: 'There was an error while saving the post to the database', stack: err.stack})
        })
    }
})

router.put('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const {title, contents} = req.body
        if(!title || !contents){
            res.status(400).json({message: `Provide title and contents for ${id}` })
        }else{
            const post = await Posts.findById(id)
            if(!post){
                res.status(404).json(({message: `The post with the specified ${id} does not exist`}))
            }else{
                const newPost = await Posts.update(id, {title, contents})
                if(newPost === 1){
                    res.status(200).json({id: Number(id), title, contents})
                }else{
                    res.status(500).json({message: 'The post information could not be modified'})
                }
            }
        }
    }catch(err){
        res.status(500).json({message: 'The post information could not be modified'})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id)
        if(!post){
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }else{
            await Posts.remove(req.params.id)
            res.json(post)
        }
    }catch(err){
        res.status(500).json({err: err.message, message: 'Post could not be removed', stack: err.stack})
    }
})

router.get('/:id/comments', async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id)
        if(!post){
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }else{
            const comments = await Posts.findPostComments(req.params.id)
            res.json(comments)
        }
    }catch(err){
        res.status(500).json({err: err.message, message: 'The comments information could not be retrieved', stack: err.stack})
    }
})

module.exports = router