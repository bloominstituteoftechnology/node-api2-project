const express = require('express');
const Database = require('./db');
const router = express.Router()


//Creates a new post
router.post('/',(request,response)=>{
    postData = request.body 
    if(!postData.title || !postData.contents){
        return response.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{
Database.insert(postData)
.then(post=>{
    console.log(post)
    response.status(200).json(post)
})
.catch(err=>{console.log(err)
response.status(500).json({error: "There was an error while saving the post to the database"})
})
    }
})

//Creates a comment on a post 
router.post('/:id/comments',(req,res)=>{
    commentData = req.body
    if(!commentData.text){
        return res.status(400).json({errorMessage: "Please provide text property for the comment." })
    }else{
        Database.insertComment(commentData)
        .then(comment=>{
            comment?
            res.status(201).json(comment):
            res.status(404).json({message: "The post with the specified ID does not exist."})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error: "There was an error while saving the comment to the database"})
        })
    }
})
//reads posts
router.get('/',(req,res)=>{
Database.find()
.then(post=>{res.status(201).json(post)})
.catch(err=>{console.log(err)
res.status(500).json({error: "The posts information could not be retrieved."})
})
})

//reads posts by id 
router.get('/:id',(req,res)=>{
    id=req.params.id
    console.log(id) 
   Database.findById(id)
   .then(response=>{
       console.log(response)
    response?
    res.status(201).json(response):
    res.status(404).json({message: "The post with the specified ID does not exist."})
})
.catch(err=>{console.log(err)
    res.status(500).json({error: "The comment information could not be retrieved."})
})
})

//reads comments by id 
router.get('/:id/comments',(req,res)=>{
    id=req.params.id
    console.log(id) 
   Database.findCommentById(id)
   .then(response=>{
       console.log(response)
    response?
    res.status(201).json(response):
    res.status(404).json({message: "The post with the specified ID does not exist."})
})
.catch(err=>{console.log(err)
    res.status(500).json({error: "The comment information could not be retrieved."})
})
})

//destroy by id 

router.delete('/:id', (req,res)=>{
    const id = req.params.id 
    Database.remove(id)
    .then(user=>{console.log(user)
        user ?
    res.status(202).json({message: "Delete sucsessful"}):
    res.status(404).json({message: "The specified user id was not found" })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "The user could not be removed" })
    })

})

//Update by id
router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    const { title, contents } = changes
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    Database.update(id, changes)
        .then(user => {
            user ?
            res.status(200).json(user) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified.", error: err })
        })
})

module.exports = router
