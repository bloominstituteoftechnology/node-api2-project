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
    .then(post => {

        if(!post[0]){
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }else{
          res.status(200).json(post);  
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
    .then(post => {
        if(!post[0]){
        return res.status(404).json({
            message: "The post with the specified ID does not exist."
        }); 
        }
      res.status(200).json(post);
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

router.post('/:id/comments', (req, res) => {
    console.log(req.body.text)
    console.log(req.params.id)
    const { text } = req.body
    const post_id = req.params.id;

    db.findById(req.params.id)
        .then(post => {
           if(!post[0]) {
            res.status(404).json({message: "The post with the specified ID does not exist." });
           } 
        })

        if(text.length<1){
            res.status(400).json({errorMessage: "Please provide text for the comment." });
        } else {
            db.insertComment({text, post_id})
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    }); 
}

  });

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