// implement your posts router here
const express = require("express")
const { OPEN_READWRITE } = require("sqlite3")

const router = express.Router()
const posts = require("./posts-model")

router.get("/posts", (req,res)=>{
    posts.find()
    .then((posts)=>{
        res.status(200).json(posts)
    })
    .catch((err)=>{
        console.log(err)
			res.status(500).json({
				message: "Error retrieving the posts",
			})
    })
})



router.get("/posts/:id", (req, res) =>{
    posts.findById(req.params.id)
    .then((post) =>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({
                message: "Post not found"
            })
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    })
})



router.post("/posts", (req,res)=>{
    if (!req.body.title || !req.body.content){
        return res.status(400).json({
            message: "Missing title or email"
        })
    }

    posts.insert(req.body)
    .then((post)=>{
        res.status(201).json(post)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            message: "Error adding post"
        })
    })
})


router.put("posts/:id",(req, res)=>{
    if (!req.body.id){
        return res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }else if (!req.body.title || !req.body.contents){
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    posts.update(req.params.id, req.params.title, req.params.contents)
    .then((post)=>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({
                messsage: "The post could not be found"
            })
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            message: "The post information could not be modified"
        })
    })
})

// router.delete("posts/:id", (req, res)=>{
//     posts.remove(req.params.id)
//     .then((post)=>{
//         if()
//     })
// })
module.exports = router