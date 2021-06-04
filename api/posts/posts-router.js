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
    router.get('./api/posts', (req,res)=> {
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
    router.get('./api/posts/:id', (req,res)=>{
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

    

  module.exports = router