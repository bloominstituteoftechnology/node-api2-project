const express = require("express")
const posts = require("../data/db")
const router = express.Router()



router.get("/", (req, res) => {

    posts.find(req.query)
        .then (posts => {
            res.status(200).json({query: req.query, data: posts})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved."})
        })
})

router.get("/:id", (req, res) => {

    posts.findById(req.params.id)
        .then (post => {
            if(post) {
              res.status(200).json({post})  
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be retrieved."})
        })
})

router.post("/", (req, res) => {

    
    if(!title || !contents) {
        res.status(400).json({error: "Please provide title and contents for the post"})
    } else {
        posts.insert(req.body)
        .then (post => {
            res.status(201).json({post})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the comment to the database."})
        })
    }
})

router.put("/:id", (req, res) => {

    const changes = req.body

    posts.update(req.params.id, changes)
        .then (post => {
            if(post) {
              res.status(200).json({post})  
            } else if (!title || !contents){
                res.status(400).json({error: "Please provide title and contents for the post"})
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be modified."})
        })
})

router.delete("/:id", (req, res) => {
    posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({})
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post could not be removed."})  
        })
})

module.exports = router