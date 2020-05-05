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


module.exports = router