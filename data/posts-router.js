const express = require('express')
const Posts = require('./db')
const router = express.Router()
router.use(express.json())

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

router.post('/', (req,res)=>{
    console.log(req.body)
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({message: 'please make sure to send a valid title and valid contents'})  
    }else{
        //newPost
        Posts.insert(req.body)
            .then(res=>
                Posts.findById(res.id)
                    .then(post =>{
                        if(post){
                            res.status(200).json(post)
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
            )
            .catch(err=>{
                console.log("failed to save new post", err )
                res.status(500).json(()=>{
                    message: "error updating the post list"
                })
            })
    }
})



module.exports = router