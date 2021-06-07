// implement your posts router here
const Post = require('./posts-model')
const express = require("express")
const router = express.Router()

router.get('/', (req,res) =>{
    Post.find(req.query)
    .then(posts =>{
        throw new Error("Server is dead dead")
        res.status(200).json(posts)
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            message:'Error retrieving posts'
        })
    })
})

router.get('/:id', (req,res) =>{
    Post.findById(req.params.id)
    .then(post =>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({message: 'Post(s) was not found'})
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            message:'Error retrieving posts'
        })
    })
})

router.post('/', (req,res) =>{
    Post.insert(req.body)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            message:'Error adding the post'
        })
    })
})

router.put('/:id', (req,res) =>{
    const changes = req.body;
    Post.update(req.params.id, changes)
        .then(post =>{
            if(post){
                res.status(200).json(post)
            }else{
                res.status(404).json({ message: 'Post could not be located'})
            }
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({
                message:'Error updating posts'
            })
        })
})

router.delete('/:id', (req,res) =>{
    Post.remove(req.params.id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({ message: 'The posts has been terminated'})
        }else{
            res.status(404).json({ message: 'Post could not be found'})
        }
    })
})
router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
        .then(c => {
            if(c){
                res.status(200).json(c)
            }else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
}) 

module.exports = router