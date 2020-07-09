const express = require("express")
const comments = require("../data/db")
const router = express.Router()



router.get("/:id/comments", (req, res) => {

    comments.findPostComments(req.params.id)
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

router.post("/:id/comments", (req, res) => {

    if(!post) {
        res.status(404).json({message: "The post with the specified ID does not exist"}) 
    } else if (!text) {
        res.status(400).json({error: "Please provide text for the comment"})
    } else {
        comments.insertComment(req.body)
        .then (comment => {
            res.status(201).json({comment})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the comment to the database."})
        })
    }
})


module.exports = router