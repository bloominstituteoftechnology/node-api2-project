// implement your posts router here

const express = require('express')
const router = express.Router();
const Posts = require('./posts-model')

router.get('/api/posts', (req,res)=> {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        }).catch(err => {
            res.status(500).json({message: "The posts information could not be retrieved"})
        })
})


router.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    Posts.findById(id)
        .then(post => {
            if (!post) {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            } else {
                res.status(200).json(post)
            }
        }).catch(err => {
            res.status(500).json({message: "The post information could not be retrieved"})
        })
})

router.post('/api/posts', (req, res) => {
    const newPost = req.body;

    if(!newPost.title || !newPost.contents) {
        res.status(400).json({message:"Please provide title and contents for the post" })
    }

    Posts.insert(newPost)
        .then(res.status(201).json({newPost}))
        .catch(res.status(500).json({message: "There was an error while saving the post to the database"}))
})

router.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const updates = req.body;
   
    if(!updates.title || !updates.contents) {
        res.status(422).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.update(id, updates)
          .then(response => { // DO NOT UNDERSTAND, DB RETURNS NOTHING?
            !response ? res.status(404).json({ message: "The post with the specified ID does not exist" }) : res.status(200).json(updates);
          })
          .catch(err => {
              res.status(500).json({ message: err.message });
          })
    }
})

router.delete('/api/posts/:id', (req,res)=>{
    const {id} = req.params
    let deletedPost = {}

    Posts.findById(id)
        .then(postToBeDeleted => {
            deletedPost = postToBeDeleted
            Posts.remove(id)
                .then(res.status(202).json({deletedPost}))
                .catch(err => {
                    res.status(500).json({message:"The post could not be removed"})
                })
        })
        .catch(err => {
            res.status(404).json({message:"The post with the specified ID does not exist"})
        })
})


router.get('/api/posts/:id/comments', (req, res)=> {
    const {id} = req.params;

    Posts.findPostComments(id)
        .then(comments => {
            if (!comments) {
                res.status(404).json({ message: "The post with the specified ID does not exist"})
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(err => {
            res.status(500).json({message: "The comments information could not be retrieved"})
        })

})

module.exports = router;