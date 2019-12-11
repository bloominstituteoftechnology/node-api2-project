const express = require ('express')
const commentRouter = require('./comments')
const db = require('../data/db')
const router = express.Router()

// let db = require('./comments') 
// const app = express()
// app.use(express.json())

router.use('/:id/comments', commentRouter)

router.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            return res.json(posts)
        })
        .catch(err => {
            return res.status(500).json({ message: "The posts information could not be retrieved." })
        })
})  

router.get("/api/posts/:id", (req, res) => {
    console.log(req.params)
    db.findById(req.params.id)
        .then(post => {
            if (post) {
             return res.status(200).json(post)
              
            } else {
                return res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get("/api/posts/:id/comments", (req, res ) => {
    db.findPostComments(req.params.id)
    .then(comments => {
        if(id) {
           return res.json(comments)
        } else {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
        .catch(err => {
            return res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.post("/api/posts", (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    db.findPostComments(req.body)
    .then(db => {
        return res.status(201).json(db)
    })
    .catch(err => {
        return res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

router.post("/api/posts/:id/comments", async (req, res) => {
    try {   
        if(!req.body.text) {
            return res.status(400).json({ errorMessage: "Please provide text for the comment."  })
        }
  
        const post = await db.findById(req.body)
        if(!post) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." }) 
        }

        const comment = db.insertComment(req.body)
        return res.status(201).json(comment)
    }
    catch(err) {
        return res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }
})

router.delete("/api/posts/:id", (req, res) => {
    db.remove(req.params.id)
    .then(id => {
        if(id) {
         return db.remove(req.params.id)
        }

         return res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(err => {
        return res.status(500).json({ error: "The post could not be removed" })
    })
})

router.put("/api/posts/:id", async (req, res) => {
    try {
        // Call validations (error 400's) first!
        if (!req.body.title || !req.body.contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post. " })
        }
        // Validate (above) before sending user to the db.
        const post = await db.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }

        const updatedPost = await db.update(req.body)
        return res.status(200).json(updatedPost)
       
        // 500's always in my catch and last.
        } catch(err) {
            return res.status(500).json({ errorMessage: "The post information could not be modified." })
        }
})

module.exports = router