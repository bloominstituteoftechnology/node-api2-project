const express = require("express")

const router = express.Router()

const Data = require("../data/db")

router.get("/",(req,res) => {
    Data.find()
        .then( posts => {
            res.status(500).json(posts)
        })
        .catch((err)=>{
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.post("/",(req,res)=>{
    if (!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else {
        const insertPost = {
            title: req.body.title,
            contents: req.body.contents,
        }
        Data.insert(insertPost)
            .then((response)=> {
                res.status(201).json({...insertPost,id:response.id})
            })
            .catch((error)=> {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
    
})

router.get("/:id", (req,res)=> {
    Data.findById(req.params.id)
    .then(post => {
        post.length > 0 ? 
            res.status(200).json(post) : 
            res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(()=> {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get("/:id/comments",(req,res)=>{
    Data.findById(req.params.id)
        .then(response=>{
            console.log(response)
            if(response.length!=0){
                Data.findPostComments(req.params.id)
                    .then((comments)=>{
                        console.log(response)
                        if(comments.length!=0){
                            res.status(201).json({comments})
                        } else {
                            res.status(404).json({message: "This post has no comments"})
                        }
                    })
                    .catch(()=>{
                        res.status(500).json({error: "There was an error while finding comments from the database"})
                    })
            } else {
                res.status(404).json({message: "The post with the specified id does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while finding comments from the database"})
        })
})

router.post("/:id/comments",(req,res)=>{
    Data.findById(req.params.id)
        .then((response)=> {
            if(response.length!=0){
                if(!req.body.text) {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." })
                } else {
                    Data.insertComment({...req.body,post_id:req.params.id})
                        .then((response)=>{
                            res.status(201).json(response)
                        })
                        .catch(()=>{
                            res.status(500).json({ error: "There was an error while saving the post to the database" })
                        })
                }
            } else {
                res.status(404).json({message: "The post with the specified id does not exist"})
            }
            
            
        })
        .catch((error)=>{
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})

router.delete("/:id",(req,res)=>{
    Data.findById(req.params.id)
        .then((response)=> {
            if(response.length>0){
                Data.remove(req.params.id)
                .then(()=>{
                    res.status(200).json({message: "Post removed"})
                })
                .catch(()=>{
                    res.status(500).json({error: "The post could not be removed"})
                })
            }else{res.status(404).json({message: "The post with the specified id does not exist"})}
            
            
        })
        .catch( ( )=> {
            res.status(500).json({error: "The post could not be removed"})
        })
    
})

router.put("/:id",(req,res) => {
    Data.findById(req.params.id)
        .then((response)=>{
            console.log(response)
            if(response.length!=0){
                console.log("greater than")
                if(req.body.title && req.body.contents){
                    console.log("meets requirements")
                    Data.update(req.params.id,req.body)
                        .then((response)=> {
                            console.log(response)
                            res.status(200).json({id:req.params.id,...req.body})
                        })
                        .catch(()=>{
                            console.log("catcherr")
                            res.status(500).json({ error: "The post information could not be modified." })
                        })
                } else {
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                }
                
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(()=>{
            console.log("2ndcatcherr")
            res.status(500).json({ error: "The post information could not be modified." })
        })
})



module.exports = router;