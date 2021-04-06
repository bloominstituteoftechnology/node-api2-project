// implement your posts router here
const express = require("express")
const router = express.Router()
const posts = require("./posts-model.js")


router.get("/", (req, res)=>{
    posts.find()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

router.get("/:id", (req, res)=>{
    posts.findById(req.params.id)
    .then(data=>{
        data ? res.status(200).json(data) : res.status(404).json({ message: "The post with the specified ID does not exist" })
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

router.post("/", (req, res)=>{
    if (!req.body.title || !req.body.contents){
        return res.status(400).json({ message: "Please provide title and contents for the post" })
    }
    console.log("I still ran")
    posts.insert(req.body)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    })
})

router.put("/:id", async (req, res)=>{
    if (!req.body.title || !req.body.contents){
        return res.status(400).json({ message: "Please provide title and contents for the post" })
    }
    await posts.findById(req.params.id)
    .then(data=>{
        data ? {} : res.status(404).json({ message: "The post with the specified ID does not exist" })
    })
    posts.update(req.params.id, req.body)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({ message: "The post information could not be modified" })
    })
})

router.delete("/:id", async (req, res)=>{
    await posts.findById(req.params.id)
    .then(data=>{
        data ? {} : res.status(404).json({ message: "The post with the specified ID does not exist" })
    })
    posts.remove(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json()
    })
})

router.get("/:id/comments", async (req, res)=>{
    await posts.findById(req.params.id)
    .then(data=>{
        data ? {} : res.status(404).json({ message: "The post with the specified ID does not exist" })
    })

    posts.findPostComments(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json()
    })
})

module.exports = router