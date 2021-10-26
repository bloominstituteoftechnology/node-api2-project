const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

router.get('/', (req, res) => {
    Post.find()
    .then(post => { 
        res.json(post)
    })
    .catch(err => { 
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try { 
        const post = await Post.findById(id)
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else { 
            res.status(200).json(post)
        }
    } catch (err) { 
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    }
    
})

router.post('/', (req, res) => {
    const { title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        })
    } else { 
       Post.insert({ title, contents})
         .then(({id}) => { //destruct the id so that you can grab not just the id but the title etc.
                return Post.findById(id)
         })
         .then(post => {
             res.status(201).json(post)
         })
         .catch(err => { 
            res.status(500).json({
            message: "There was an error while saving the post to the database",
            err: err.message,
            stack: err.stack,
        })
    })
    } 
})

router.put('/:id', (req, res) => {
    const { title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        })
       } else { 
           Post.findById(req.params.id)
           .then(post => {
               if(!post) { 
                   res.status(404).json({
                       message: "The post with the specified ID does not exist"
                   })
               } else {
                   return Post.update(req.params.id, req.body)
               }
           })
           .then(data => {
               if (data)
               return Post.findById(req.params.id)
           })
           .then(post => {
               if (post) { 
                res.status(201).json(post)
               }
           })
           .catch(err => {
                res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message,
                stack: err.stack,
                })
           })
       }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try { 
       const post = await Post.findById(id)
       if (!post) { 
           res.status(404).json({
               message: "The post with the specified ID does not exist"
           })
       } else { 
           await Post.remove(id)
           res.status(200).json(post)
       }
    } catch (err) {
            res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    }
})

router.get('/id/comments', async (req, res) => {
    try {

    }catch (err) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    }
    
})

module.exports = router;
