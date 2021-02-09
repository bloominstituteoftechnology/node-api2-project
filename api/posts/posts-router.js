// implement your posts router here
const express = require('express'); 
const postRoute = express.Router(); 
const Post = require('./posts-model'); 

postRoute.get('/', (req,res) => {
    Post.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: `${err.message}. The posts information could not be retrieved.`})
    })
})

postRoute.get('/:id', (req, res) => {
const id = req.params.id
    Post.findById(id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message:`The post with the id of ${id} does not exist.`})
        }
    })
    .catch(err => {
        status(500).json({message:`The post information could not be retrieved because ${err}`})
    })
})

//RESPONSE IS ONLY THE ID??
postRoute.post('/', (req,res) => {
    const { title, contents } = req.body;
    Post.insert(req.body)
    .then(post => {
        if(!title || !contents){
            res.status(400).json({message: 'please provide titles and contents for the post'})
        } else {
            res.status(201).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({message: `There was an ${err} while saving the post to the database.`})
    })
})

//RETURNS INCORRECT ID? did not work when put id in {}. Did I pass in id correctly? 
postRoute.put('/:id', (req, res) => {
    const id = req.params.id;
    const {title, contents} = req.body;
    if (!title || !contents){
        res.status(400).json({message:"Please provide title and contents for the post"})
    } else {
        Post.update(id, req.body) //guess here, really. 
        .then(post => {
            if (!post){
                res.status(404).json({message:"The post with the specified ID does not exist"})
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({message:"The post information could not be modified"})
        })
    }
})

postRoute.delete('/:id', (req, res) => {
    const id = req.params.id; 
    Post.remove(id)
    .then(post => {
        if (!post){
            res.status(404).json({message:"The post could not be removed"})
        } else{
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({message:"The post could not be removed"})
    })
})

postRoute.get('/:id/comments', (req,res) => {
    const id = req.params.id; 
    Post.findPostComments(id)
    .then(post=> {
        if (!post){
            res.status(404).json({message:"The post with the specified ID does not exist"})
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({message:"The comments information could not be retrieved"})
    })
})

postRoute.use('*', (req,res) => {
    res.status(404).json({message:"There's a CATCH!"})
})

module.exports = postRoute;

//why do you not have to specify the id at !post? 