const express = require ('express')
const commentRouter = require('./comments')
const db = require('../data/db')
const router = express.Router()

// let db = require('./comments') 
// const app = express()
// app.use(express.json())

router.use('/:id/comments', commentRouter)


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

router.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            return res.json(posts)
        })
        .catch(err => {
            return res.status(500).json({ message: "The posts information could not be retrieved." })
        })
})  

router.get("/api/posts/:id", (res, req) => {
    db.findById(req.params.id)
        .then(id => {
            if (id) {
              res.json(id)
            } else {
                return res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            return res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get("/api/posts/:id/comments", (res, req) => {
    db.insert()
    .then(posts => {
        if(id) {
            res.json(posts)
        } else {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
        .catch(err => {
            return res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.delete("/api/posts/:id", (res, req) => {
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
        const title = await db.findById(req.params.id)
        if (!title) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }

        const contents = await db.update(req.body)
        if (!contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
        } catch(err) {
            return res.status(500).json({ errorMessage: "The post information could not be modified." })
        }
        
        const contents = db.update(req.body)
            return res.status(200).json(contents)
})