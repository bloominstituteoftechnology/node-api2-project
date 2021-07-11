// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');
const router = express.Router();
// 1

router.get('/', (req ,res) => {
    Posts.find()
    .then(posts =>{res.status(200).json(posts)
})
    .catch(err =>{
    res.status(500).json({message:'The posts information could not be retrieved'})
})
})

// 2

router.get('/:id', (req,res) => {
    Posts.findById(req.params.id)
    .then(post =>{
        if(post) {
            res.status(200).json(post)
}
        else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
}
})
.catch(err  =>{ res.status(500).json({message:'post information could not be retrieved'})
})
})


// 3

router.post('/', (req,res) =>{
    if(!req.body.title && !req.body.contents) {
    res.status(400).json({message:'please provide title and contents'})
}
    else{ const {title,contents}=req.body 
    Posts.insert({title,contents})
    .then(posts =>{
        res.status(201).json(posts)
})
    
    .catch(err =>{
        res.status(500).json({message:'there was an error uploading this post'})
})
}
})

// 4

router.put('/:id', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
}
    else {
    Posts.findById(req.params.id)
    .then(post => {
        if(!post) {
         res.status(404).json({message: "The post with the specified ID does not exist"})
}
    else {        
    const {title, contents} = req.body
    Posts.update({title, contents})
    .then(post => {
    res.status(200).json(post)
})
    .catch(err => {
    res.status(500).json({message: "The post information could not be modified"})
})
}})

}
})


// 5

router.delete('/:id', (req, res) => {
Posts.remove(req.params.id)
    .then(post => {
    if(post) {
    res.status(200).json(post)
}
    else {
        res.status(404).json({message: "The post with this ID does not exist"})
}
})
.catch(err => {
    res.status(500).json({message: "The post could not be removed"})
})
})

// 6

router.get('/:id/comments', async (req, res) => {
    try {
    const {id} = req.params
    const comments = await Posts.findPostComments(id)
        if(comments.length) {
            res.status(200).json(comments)
}
    else {
    res.status(404).json({message: "The post with the specified ID does not exist"})
}}
    catch (err) {
    res.status(500).json({message: "The comments information could not be retrieved"})
}
})

module.exports = router