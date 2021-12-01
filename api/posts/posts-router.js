// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router() 


router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get('/:id', async (req, res)=>{
try {
const post = await Posts.findById(req.params.id)
if(!post){
    res.status(404).json({
        message: "The post with the specified ID does not exist"
    })
}else{
    res.json(post)
}
}catch (err){
    res.status(500).json({
        message: "The posts information could not be retrieved"
    })
}
})
router.post('/', (req, res)=>{
const {title , contents} = req.body
if(!title || !contents){
    res.status(400).json({
        message: "Please provide title and contents for the post"
    })
}else{
    Posts.insert({title, contents})
    .then(({id})=>{
        return Posts.findById(id)
    }).then(post =>{
        res.status(201).json(post)
    }).catch(error=>{
        console.log(error)
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    })
}
})

router.delete('/:id', async (req, res)=>{
try{
    const post = await Posts.findById(req.params.id)
    if(!post){
        res.status(404).json({
            message: 'The post with the specified ID does not exist'
        })
    }else{
        await Posts.remove(req.params.id)
        res.json(post)
    }
}catch(error){
    console.log(error)
    res.status(500).json({
        message: 'The post could not be removed'
    })
}
})

router.put('/:id', (req, res) => {
    const {title , contents} = req.body
    if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }else{
        Posts.findById(req.params.id)
        .then(post =>{
            if(!post){
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            }else{
                return Posts.update(req.params.id, req.body)
            }
        })
        .then(input =>{
            if (input){
                return Posts.findById(req.params.id)
            }
        })
        .then(post =>{
            if (post) {
                res.json(post)
            }
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
    }
    })


router.get('/:id/comments', async (req, res)=>{
try{
    const post = await Posts.findById(req.params.id)
    if(!post){
        res.status(404).json({
            message: 'The post with the specified ID does not exist',
        })
    }else {
        const messages = await Posts.findPostComments(req.params.id)
        res.json(messages)
    }
} catch (err){
    res.status(500).json({
        message:"The comments information could not be retrieved",
        err: err.message,
        stack: err.stack
    })
}
})

module.exports = router 