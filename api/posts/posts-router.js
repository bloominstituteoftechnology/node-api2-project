// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router()

// | 1 | GET    | /api/posts              | Returns **an array of all the post objects** contained in the database                                                          |
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({message: "The posts information could not be retrieved"})
        })
})

// | 2 | GET    | /api/posts/:id          | Returns **the post object with the specified id**                                                                               |
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
           if(post) {
               res.status(200).json(post)
           }
           else {
               res.status(404).json({message: "The post with the specified ID does not exist"})
           } 
        })
        .catch(err => {
            res.status(500).json({message: "The post information could not be retrieved"})
        })
})

// | 3 | POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**                 |
router.post('/', (req, res) => {
        if(!req.body.title || !req.body.contents) {
            res.status(400).json({message: "Please provide title and contents for the post"})
        }
        else {
            const {title, contents} = req.body
            Posts.insert({title, contents})
                .then(post => {
                    res.status(201).json(post)
                })
                .catch(err => {
                    res.status(500).json({message: "There was an error while saving the post to the database"})
                })
        }
})
    

// | 4 | PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original |
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
                    }
            })
    
    }
})

// | 5 | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**                                                  |
router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post could not be removed"})
        })
})

// | 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id                                  |
router.get('/:id/comments', async (req, res) => {
    try {
        const {id} = req.params
        const comments = await Posts.findPostComments(id)
        if(comments.length) {
            res.status(200).json(comments)
        }
        else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    }
        catch (err) {
            res.status(500).json({message: "The comments information could not be retrieved"})
        }
})


module.exports = router