// implement your posts router here


// installing express
const express = require ("express")

//importing post from ./post
const posts = require("./posts-models")

//installing router
const router = express.Router()

// router.get with a relative path

router.get("/", (req, res) => {
    post.find() //requesting data ./posts-models
    .then(posts => {
        console.log(posts)
        //promises
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
        
        
router.get("/:id", (req,res) =>{
    post.findById(req.params.id) // post links to helper function and request for id
    .then(posts => {
      if(post!){
        res.statu(404).json({
         message: "The post with the specified ID does not exist"
})
.catch(err = > {
    res.status(500).json({
        message:"The post information could not be retrieved"
    })
})
})
})


router.post("/", req, res) => {
    if(req.body.title && req.body.contents){
    res.status(400).json({
        message: " Please provide title and contents for post"
    })
    }
    
    else{
        post.insert(req.body)
        .then(posts =>{
            res.status(201).json(post) 
        })
        .catch(err =>{
            res.status(500).json({message: "There was an error while saving the posts to the database"})
            })
        })
    }

    router.put("/:id", (req,res) => {
        if(req.body.title && req.body.contents === null){
           res.status(404).json({
               message:" The post with the specifed ID does not exist"
           })
            if(!req.body.title || !req.body.contents){
               res.status(400).json({ message: "Please provide title and contents for the post" });
          
            else{
               post.update(req.params.id, req.body)
               .then(post =>{
                   if(!post)
                   res.status(404).json({ message : `${req.params.id}`})
               })
              .catch(err=>{
                res.status(500).json({ message: "The post information could not be modified" })
               })
           }
          
           }) 
           .then(updatedId )
        }
    })

     
        
    router.delete("/:id",(req, res)=>{
        post.findById(req.params.id)
        .then(results=>{
            if(results===null || results===null){
                res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist` })
                }
            else{
                post.remove(req.params.id)
                     .then(()=>{r
                        es.status(200).json(message:"The post with the specified ID does not exist' )})      
                .catch(err=>{
                    res.status(500).json({ message: "The post could not be removed" });
                })
            }
        })
        
        
        .catch(err=>{
            res.status(500).json({ message: "The post could not be removed" });
        })
    })
    //| 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id 
    router.get("/:id/comments", (req, res)=>{
        post.findById(req.params.id)
        .then(results=>{
            if(results===null || results===undefined){
                res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist` })
            }
            else{
                post.findPostComments(req.params.id)
                .then(post=>{
                 
                    res.status(200).json(post);    
                   })
                   .catch(err=>{
                    res.status(500));
                })2
            }
        })
    
        
        
        
        
        module.exports = router;
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

