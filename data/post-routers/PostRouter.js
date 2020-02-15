const express = require("express")
const db = require("../db")

const router = express.Router()

//                                 GET Requests

// GET all posts(/api/posts)
router.get("/", (req, res) =>{
    db.find()
        .then((db) =>{
            res.status(200).json(db)
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved.",
            })
        })

})


// GET post by ID (/api/posts/:id)
router.get("/:id", (req, res) =>{
    db.findById(req.params.id)
        .then((db) =>{
            if (db) {
            res.status(200).json(db)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message:"The post information could not be retrieved."
            })
        })
})

// GET comments by post ID (api/posts/:id/comments)
router.get("/:id/comments", (req, res) =>{
    db.findPostComments(req.params.id)
        .then((comments) =>{
            if (comments) {
            res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message:"The post with the specified ID does not exist",
                })
            }
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message: "The comments information could not be retrieved."
            })
        })
})

//                              POST Requests


// POST new post (/api/posts)
router.post("/", (req, res) =>{
    const { title, contents } = req.body
    if (!title || !contents) {
        return res.status(400).json({
            message:"Please provide title and contents for the post."
        })
    }

    db.insert(req.body)
        .then((newPost) =>{
            res.status(201).json(newPost)
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the post to the database."
            })
        })
})

router.post("/:id/comments", (req, res) =>{
    const { text } = req.body
    if(!db){
        return res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    }
   
    if(!text){
        return res.status(400).json({
            message:"Please provide text for the comment."
        })
    }

    db.insertComment(req.params.id, req.body)
    .then((newComment) =>{
        res.status(201).json(newComment)
    })
    .catch((error) =>{
        console.log(error)
        res.status(500).json({
            message: "There was an error while saving comments to the database."
        })
    })


})

//                              DELETE request

router.delete("/:id", (req, res) =>{
    db.remove(req.params.id)
        .then((count) =>{
            if (count > 0) {
                res.status(200).json({
                    message: "Post Deleted."
                })
            } else {
                res.status(404).json({
                    message:"The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json({
                message: "The post could not be removed."
            })
        })
})


//                              PUT request


router.put("/:id", (req, res) =>{
    const { title, contents } = req.body
    if (!title || !contents) {
        return res.status(400).json({
            message:"Please provide title and contents for the post."
        })
    }

    db.update(req.params.id, req.body)
    .then((db) =>{
        if(db) {
            res.status(200).json(db)
        } else {
            res.status(404).json({
                message: "the post with the specified ID does not exist.",
            })
        }
    })
    .catch((error) =>{
        console.log(error)
        res.status(500).json({
            message: "The post information could not be modified."
        })
    })
})
module.exports = router