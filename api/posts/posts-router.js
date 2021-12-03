// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()


//| 1 | GET    | /api/posts              | Returns **an array of all the post objects** contained in the database 

router.get('/', (req, res) => {
Post.find(req.query)
.then( posts => {
    console.log(posts)
    res.status(200).json(posts)
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        message:'The posts information could not be retrieved'
    })
})
})

//| 2 | GET    | /api/posts/:id          | Returns **the post object with the specified id**                          
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(posts => {
        if(posts){
            res.status(200).json(posts)
        }else{
            res.status(404).json({
                message:'The post with the specified ID does not exist'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message:'The post information could not be retrieved',
            err:err.message
        })
    })
})


//| 3 | POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**                 |
router.post('/', async(req, res) => {

   
   await Post.insert(req.body)
    .then(create => {
      
        if(create){
            res.status(201).json(create)
        }else{
            if(!req.body.title || !req.body.contents){
                res.status(400).json({message:'Please provide title and contents for the post'})
            }
        }
    })
.catch(err => {
    res.status(500).json({
        message:'There was an error while saving the post to the database',
        err:err.me
    })
})
})


//| 4 | PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original |
router.put('/:id', (req, res) => {
    
})


//| 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**                                                  |
router.delete('/:id', (req, res) => {
    
})


//| 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id  
router.get('/:id/comments', (req, res) => {
    
})


module.exports = router