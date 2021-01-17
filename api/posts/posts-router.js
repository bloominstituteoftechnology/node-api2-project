const e = require('express');
const express = require('express');
const router = express.Router();
const DB = require('../db-helpers');

const errorMessage = 'The post with the specified id does not exist'

//GET /api/posts

router.get('/',async (req,res)=>{
    const posts = await DB.find();
    try{
        res.status(200).json(posts)
    }catch{
        res.status(500).json({error:'the posts information could not be retrieved.'})
    }
})

//GET /api/posts/:id

router.get('/:id',(req,res)=>{
    const {id} = req.params;

    DB.findById(id)
    .then((post)=>{
        if(post[0]=== undefined){
            res.status(404).json({error:errorMessage})
        }else{
            res.status(200).json(post)
        }
    })
    .catch(()=>{
        res.status(500).json({error:'The post information could not be retrieved'})
    })
})

// GET /api/posts/:id/comments 

router.get('/:id/comments',(req,res)=>{
    const{id}= req.params;

    DB.findById(id)
    .then((post)=>{
        if(post[0]=== undefined){
            res.status(404).json({error:errorMessage})
        }else{
            DB.findPostComments(id)
            .then((comments)=>{
                res.status(200).json(comments);
            })
            .catch((err)=>{
                res.status(500).json({error:"The comments information could not be retrieved"})
            })
        }
    })
    .catch((err)=>{
        res.status(500).json(err.message)
    })
})


//DELETE /posts/:id

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    DB.findById(id)
    .then((post)=>{
        if(post[0]=== undefined){
            res.status(404).json({error:errorMessage})
        }else{
            DB.remove(id)
            .then((post)=>{
                res.status(200).json({message:"Post deleted"})
            })
            .catch((err)=>{
                res.status(500).json({error:"The post could not be removed"})
            })
        }
    })
    .catch(()=>{
        res.status(500).json({error:'The post information could not be retrieved'})
    })
})

//update the post api/posts/:id
// change it JSON when updating you idiot

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const updatedPost = req.body;
    DB.findById(id)
    .then((post)=>{
        if(post[0]=== undefined){
            res.status(404).json({error:errorMessage})
        }else{
            if(!updatedPost.title || !updatedPost.contents){
                res.status(400).json({error:"please provide the title and contents for the post"});
                return;
            }

            DB.update(id,updatedPost)
                .then((post)=>{
                    res.status(200).json({...post[0],...updatedPost})
                })
                .catch(()=>{
                    res.status(500).json({error:"the post information could not be modified"})
                })
        }
    })
    .catch(()=>{
        res.status(500).json({error:'The post information could not be retrieved'})
    })
})






module.exports = router;