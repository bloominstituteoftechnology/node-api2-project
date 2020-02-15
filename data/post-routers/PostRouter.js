const express = require("express")
const db = require("../db")

const router = express.Router()

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
            res.status(200).json(hub)
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



