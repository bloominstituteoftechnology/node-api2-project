const express = require("express")

const router = express.Router()

const Data = require("../data/db")

router.get("/",(req,res) => {
    Data.find()
        .then( posts => {
            console.log(posts)
            res.status(500).json(posts)
        })
        .catch((err)=>{
            console.log(err)
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



module.exports = router;