const express = require("express");

const Posts = require("../data/db");

// notice the uppercase R
const router = express.Router(); // invoke Router()


router.post("/", (req,res) => {
    const {title, contents} = req.body
    Posts.insert({title, contents})
        .then(post => {
            if(post){
            res.status(201).json(post)
            }
            else if (!title.post || !contents.post ){
                res.status(400).json({errorMessage: "Please provide title and contents for the post."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database."})
        })
})

router.post('/:id/comments', (req, res) => {
    // Posts.findPostComments(req.params.id)
    const commentsInfo = { ...req.body, post_id: req.params.id }
    Posts.insertComment(commentsInfo)
        .then( comment => {
            if (comment) { 
                res.status(201).json(comment);
            } else if (!comment.post_id) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            } else if (!comment.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment."})
            }
        })
        .catch( error => {
            console.log(error);
                res.status(500).json({ message: "There was an error while saving the comment to the database."})
        })
})


router.get("/", (req,res)=> {
    Posts.find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err =>{
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })

})

router.get("/:id", (req,res) => {
    const {id} = req.params
    
    // if(id === null || id === {} || !id | id === req.body.id){
    //     res.status(404).json({Error: "Failed to get post with id."})
    // } else {
    Posts.findById(id)
    .then(post => {
        
         if(post){
            res.status(201).json(post);
         }
         else {
             res.status(404).json({Error: "Failed to get post with id."})
         }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
// }
})

router.get("/:id/comments", (req, res) => {
    const {id} = req.params;

    Posts.findPostComments(id)
    .then(comments => {
        if(comments.text){
            res.status(200).json(comments);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Posts.remove(id)
    .then(post => {
        if(post){
            res.status(200).json( {success: "Delete Success."});
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed."})
    })
})

router.put("/:id", (req, res) => {
    const {id} =req.params;
    const changes = req.body;

    Posts.update(id, changes)
    .then(post => {
        console.log(changes)
        if(!changes.title || !changes.contents){
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        } 
        else if(post){
            res.status(200).json({success: "Post Success."});
        }
        else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "Please provide title and contents for the post."})
    })

})




module.exports = router;