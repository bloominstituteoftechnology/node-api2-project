const express =require('express');
const db= require ("../data/db");

const router=express.Router();




//GET all posts (api/posts)

router.get("/", (req, res)=>{
    db.find()
    .then(users=>{
        res.status(200).json(users)
    
})
.catch(err=>{
    res.status(500).json({error: " The information is not received"})
})
})

//  POST   | /api/posts | Creates a post using the information sent inside the `request body`.  

router.post("/", (req,res) =>{
    db.insert(req.body)
    .then( addpost => {
       res.status(201).json(addpost)
    })
    .catch(err=>{
     res.status(500).json({error:" Error while making a post"})
    })
})

// POSTS WITH ID 

router.post('/:id/comments', (req,res)=>{
    const {id}=req.params;
    db.findPostComments(id)
    .then( searchpost =>{
        res.status(201).json(searchpost)
    })
    .catch(err=>{
        res.status(500).json({error: "The comment information could not be received "})
    })
})


module.exports=router;