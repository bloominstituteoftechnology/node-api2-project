const express=require("express");
const posts=require('../db');
const router=express.Router();

router.get('/api/posts',(req,res)=>{
    posts.find(req.query)
        .then((postsList)=>{res.status(200).json(postsList)})
        .catch(()=>{res.status(500).json({ error: "The posts information could not be retrieved"})})
        
});

router.get('/api/posts/:id',(req,res)=>{
    posts.findById(req.params.id)
        .then((post)=>{
            if(!post.length){res.status(404).json({ message: "The post with the specified ID does not exist."})}
            else{res.status(200).json(post)}
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved." })})
});

router.get('/api/posts/:id/comments',(req,res)=>{

    posts.findPostComments(req.params.id)
        .then(comment=>
            {
                if(!comment.length){res.status(404).json({message: "The post with the specified ID does not exist or the post has no comments."})}
                else{res.status(200).json(comment)}})
        .catch(error=>{
            console.log(error)
            res.status(500).json(error)
        })
});

router.post('/api/posts',(req,res)=>{
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    posts.insert(req.body)
        .then((post)=>{
            res.status(201).json(post)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).json(
                { error: "There was an error while saving the post to the database" }
            )
        })
});

router.post('/api/posts/:id/comments',(req,res)=>{
        // need to get posts first
    if(!req.params.id){res.status(404).json({message:"The post with the specified ID does not exist."})}
    else if(!req.body.text){res.status(400).json({errorMessage:"Please provide text for the comment."})}
    posts.insertComment(req.body)
        .then((comment)=>{res.status(201).json(comment)})
        .catch((error)=>{
            console.log(error)
            res.status(500).json({error:"There was an error while savinge the comment to the database"})
        })
});

router.put('/api/posts/:id',(req,res)=>{
    // need to get posts first
    // if(!req.params.id){
    //     return res.status(404).json({message: "The post with the specified ID does not exist."})
    // }
    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    posts.update(req.params.id,req.body)
        .then(post=>
            {if(post){res.status(200).json(post)}
            else{res.status(404).json({message: "The post with the specified ID does not exist."})}})
        .catch(error=>{
            console.log(error)
            res.status(500).json({error: "The post information could not be modified."})
        })
});

router.delete('/api/posts/:id',(req,res)=>{

    
    posts.remove(req.params.id)
        .then((postId)=>
        {if(postId>0){res.status(200).json({message: "The post has been deleted."})}
        else{res.status(404).json({message: "The post with the specified ID does not exist."})}})
        .catch((error)=>{
            console.log(error)
            res.status(500).json({error: "The post could not be removed."}
        )})
})

module.exports = router
