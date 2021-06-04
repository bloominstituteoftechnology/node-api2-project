// implement your posts router here
const Post = require("./posts-model.js");
const express = require("express");
const router = express.Router();

//Example request
// router.get('/', (req, res) => {
//     Dog.find()
//       .then(dogs => {
//         res.status(200).json(dogs);
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error retrieving the dogs',
//         });
//       });
//   });

    //GET request to retrieve all the post data
    router.get('./posts', (req,res)=> {
        Post.find()
            .then(posts => {
                res.status(200).json(posts);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message:'The posts information could not be retrieved'
                });
            });
    });

    //GET to retrieve post by ID
    router.get('./posts/:id', (req,res)=>{
        const idVar = req.params.id;
        Post.findById(idVar)
            .then(post=>{
                if(!post){
                    res.status(404).json({message:"Post not found"})
                }else{
                    res.status(200).json(post)
                }
            })
            .catch(err=>{
                res.status(500).json({message:'error'})
            })
    });
    //POST
    router.post('./posts', (req, res)=>{
        const newPost = req.body
        if(!newPost.title || !newPost.contents){
            res.status(400).json("Please provide title and contents")
        }else{
            Post.insert(newPost)
            .then(post=>{
                res.status(201).json(post)
            })
            .catch(err=>{
                res.status(500).json({message: "There was an error while saving the post to the database"})
            })
        }
    });
    //PUT by ID
    router.put('./posts/:id', async (req, res)=> {
        const idVar = req.params.id;
        const changes = req.body;
        
        try{
            if(!changes.title || !changes.contents){
                res.status(422).json({message: "Requires title and contents"})
            }else{
                const updatedPost = await Post.update(idVar, changes)
                if(!updatedUser){
                    res.status(404).json({message:"User not found"})
                }else{
                    res.status(200).json(updatedPost)
                }
            }
        }catch(err){
            res.status(500).json({message:"Error"})
        }
    })

    //DELETE by ID
    router.delete("./api/posts/:id", async (req,res)=>{
        try{
            const idPost = req.params.id;
            const deleteId = await Post.remove(idPost);

            if(!deleteId){
                res.status(404).json({message:"Post not found"})
            }else{
                res.status(200).json(deleteId)
            }
        }catch(err){
            res.status(500).json({message:"Error"})
        }
    });

    //GET comments of specific id
    // router.get('./posts/:id', (req,res)=>{
    //     const idVar = req.params.id;
    //     Post.findById(idVar)
    //         .then(posts=>{
    //             if(!posts){
    //                 res.status(404).json({message:"Post with the specified ID does not exist"})
    //             }else{
    //                Post.findPostComments(posts) 
    //             }
    //         })
    //         .catch(err=>{
    //             res.status(500).json({message:'error'})
    //         })
    // });

    //ANOTHER WAY TO DO THE GET OF COMMENTS:

    router.get('./posts/:id', async (req,res)=>{
        try{
            const idVar =req.params.id;
            const postComments = await Post.findPostComments(idVar);

            if(!postComments){
                res.status(404).json({message:"Post not found"})
            }else{
                res.status(200).json(postComments)
            }
        }catch(err){
            res.status(500).json({message:"Error"})
        }
    });
    

    
    //CATCH ALL 
    server.use("*",(req,res)=>{
        res.status(404).json({message: "Not Found"})
    })

  module.exports = router