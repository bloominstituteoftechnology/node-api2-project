const express = require('express')
const Posts = require('./db')
const router = express.Router()
router.use(express.json())

//retrieves all posts
router.get('/', (req,res)=>{
    Posts.find(req.query)
        .then(posts=>{
            res.status(200).json(posts)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: 'Error retrieving data'})
        })
})

//retrieves specific post by id
router.get('/:id', (req,res)=>{
    Posts.findById(req.params.id)
    .then(post =>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({message: 'there is no post with that id'})
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: 'Error retrieving data'
        })
    })
})  

//makes a new post
router.post('/', (req,res)=>{
    //checks to see if request body is valid
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({message: 'please make sure to send a valid title and valid contents'})  
    }//if its valid it will attempt to use the insert method
    else{
        Posts.insert(req.body)
            .then(resp=>{
                console.log(resp.id)
                //if it successfully posts it recieves an id
                //so now we use that id to retrieve the object from the db
                Posts.findById(resp.id)
                    .then(post =>{
                        if(post){
                            res.status(200).json(post[0])
                        }else{
                            res.status(404).json({message: 'unable to find post with matching id'})
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).json({
                            message: 'Error retrieving data'
                        })
                    })   
            })
            .catch(err=>{
                console.log("failed to save new post", err )
                res.status(500).json(()=>{
                    message: "error updating the post list"
                })
            })
    }
})

//deletes a post
router.delete('/:id',(req,res)=>{
    //first we check to see if there is a post matching the id
    //if we find it we add it to the deleted post array
    //if not we will respond with errors
    Posts.findById(req.params.id)
        .then(post =>{
            if(post){
                Posts.remove(req.params.id)
                    .then(resp=>{
                        console.log(resp)
                        res.status(200).json(post[0])
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: 'the post could not be removed'
                        })
                    })
            }else{
                res.status(404).json({message: 'there is no post with that id'})
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'Error retrieving data'
            })
        })
    //next we check if the deleted post array has an element in it
    //if so we will attempt to delete it
    //if successful we will return the contents of the deleted post

})

//gets a list of comments for a specific post
router.get('/:id/comments',(req,res)=>{
    //checks to see if the post exists
    //if it does we attempt to fetch the comments
    Posts.findById(req.params.id)
        .then(post =>{
            if(post){
                Posts.findPostComments(req.params.id)
                    .then(resp=>{
                        //console.log(resp)
                        res.status(200).json(resp)
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: 'unable to retrieve comments'
                        })
                    })
            }else{
                res.status(404).json({message: 'there is no post with that id'})
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'Error retrieving data'
            })
        })
})

//posts a new comment
router.post('/:id/comments',(req,res)=>{
    //first we check to see if the content is valid
    //checks to see if the post exists
    //if it does we attempt to post a new comment
    //console.log(req.body)
    if (!req.body.text) {
        res.status(400).json({message: 'please add text to your comment'})  
    }
    else{
    Posts.findById(req.params.id)
        .then(post =>{
            if(post){
               // console.log(post[0].id)
                Posts.insertComment({text: req.body.text, post_id: post[0].id})
                    .then(resp=>{
                        //console.log(resp)
                        //if it succesfully posts it will retrieve a comment
                        Posts.findCommentById(resp.id)
                            .then(comment =>{
                                if(comment.length>0){
                                    res.status(200).json(comment[0])
                                }else{
                                    res.status(404).json({message: 'there is no comment with that id'})
                                }
                            })
                            .catch(err=>{
                                res.status(500).json({
                                    message: 'Error retrieving data'
                                })
                            })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: 'unable to post comment',
                            error: err
                        })
                    })
            }else{
                res.status(404).json({message: 'there is no post with that id'})
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'Error retrieving data'
            })
        })
    }    
})

//edits a post
router.put('/:id',(req,res)=>{
    //checks to see if the request body is valid
    console.log(req.params.id)
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({message: 'please add valid updates'})  
    }
    else{
    Posts.findById(req.params.id)
        .then(oldPost =>{
            if(oldPost){
               console.log(oldPost)
                Posts.update({id: oldPost[0].id, changes: req.body})
                    .then(resp=>{
                        console.log(resp)
                        //if it succesfully posts it will retrieve the updated post
                        Posts.findById(req.params.id)
                            .then(updatedPost =>{
                                if(updatedPost.length>0){
                                    res.status(200).json(updatedPost[0])
                                }else{
                                    res.status(404).json({message: 'there is no comment with that id'})
                                }
                            })
                            .catch(err=>{
                                res.status(500).json({
                                    message: 'Error retrieving data after update'
                                })
                            })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: 'unable to post comment',
                            error: err
                        })
                    })
            }else{
                res.status(404).json({message: 'there is no post with that id'})
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'Error retrieving data before update'
            })
        })
    }    
})


module.exports = router