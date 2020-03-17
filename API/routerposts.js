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

// GET with ID  (api/posts)
router.get("/:id/comments", (req, res)=>{
    const {id}=req.params;
    db.findById(id)
    .then(users=>{
        if(users.length>0){
            res.status(200).json(users)
        } else{
            res.status(404).json({error: " The user with the specific id doesn't exist"})
        }
    })
.catch(err=>{
    res.status(500).json({error: " The information is not received"})
})
})


//  POST   | /api/posts | Creates a post using the information sent inside the `request body`.  

router.post("/", (req,res) =>{
  const data=req.body
  if(!data.title || !data.contents){
      res.status(400).json({
          error: "Please provide title and contents for the post"
      })
  } else if (data.title && data.contents){
          db.insert(req.body)
          .then( post =>{
              res.status(201).json(post)
          })
          .catch(err=>{
              console.log(err)
              res.status(500).json({message:"error inserting the post"})
          })
      } else{
          res.status(500).json({error:"error inserting the post "})
      }
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


// DELETE 

router.delete('/:id', (req,res)=>{
    const {id}=req.params;
    db.remove(id)
    .then( removeposts=>{
        res.status(200).json(removeposts)
    })
    .catch(err=>{
        res.status(500).json({error:" Could not remove the post"})
    })
})

module.exports=router;

// PUT 

router.put("/:id", (req,res)=>{
    const {id}=req.params;
    const body=req.body
    db.findById(id)
    .then(userid=>{
        if (!userid.length){
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        } 
        else if (!body.title || !body.contents ){
             res.status(400).jsonp({errorMessage: "Please provide title and contents for the post."})
        } else if (body.title && body.contents){
            db.update(id, body)
                .then(put=>{
                    res.status(200).json(body)
                })
                .catch(err=>{
                    console.log(" error from update", err)
                    res.status(500).json({error : " The information cannot be modified"})
                })
        }})
    })
    
