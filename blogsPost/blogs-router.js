const express = require("express")

const Posts = require("../data/db.js");

const router = express.Router();


router.get("/", (req,res) => {
    Posts.find(req.query)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        console.log("An error had happen", error)
        res.status(500).json({
            message: "Error retriiveing Blog post"
        });
    });
});

router.get("/:id", (req,res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "Posts not found", })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Error retriving the hub"
        })
    })
})

router.post('/api/posts/post_id:2/comments', (req,res) => {
      Posts.add(req.body)
    .then(post => {
            res.status(200).json(post)
        }) 
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Error adding post"
        })
    })
})
module.exports = router