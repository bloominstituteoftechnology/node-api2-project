const express = require("express")

const router = express.Router()

const Data = require("../data/db")

router.get("/",(req,res) => {
    Data.find()
        .then( posts => {
            res.status(500).json(posts)
        })
        .catch((err)=>{
            res.status(500).json({message: "Database error, could not find posts"})
        })
})

router.get("/:id", (req,res)=> {
    Data.findById(req.params.id)
    .then(post => {
        console.log(post)
        post.length > 0 ? 
            res.status(200).json(post) : 
            res.status(404).json({message: "Could not find post with that ID"})
    })
})

router.post("/",(req,res)=>{
    console.log(req.body)
    console.log(req.body.blue)
    if (!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "Missing title or contents"})
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
                res.status(500).json({errorMessage:"Database failure, could not add post"})
            })
    }
    
})


module.exports = router;