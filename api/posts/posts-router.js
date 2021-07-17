// implement your posts router here

const express = require('express')
const Post = require('./posts-model')
const router = express.Router()


router.get('/', (req, res)=> {
  Post.find()
    .then(found => {
        res.json(found)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
})
router.get('/:id', async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else { //only if and if-else have a logic pack ()
            res.json(post)
        }
        //express puts it all into req, all vars into params
        //for us to access with .whatWeWant
        //console.log('--->', whatever)
        
    }   catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    }
})

router.post('/', (req, res)=> {
    const {title, contents} = req.body // pull title/contents from req.body
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        })
    } else {
        Post.insert({ title, contents})
            .then(({id}) => {
                return Post.findById(id)
            })
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                    err: err.message,
                    stack: err.stack,
                }) 
            })
        // console.log('success') //test w hhtp posts :5000/api/post 
                               //title=foo contents=bar
    }
})
router.delete('/:id', async (req, res)=> {
    try {
      const post = await Post.findById(req.params.id)
      if (!post) {
          res.status(404).json({
              message:'The post with the specified ID does not exist',
          })
      }   else {
          await Post.remove(req.params.id)
          res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message,
            stack: err.stack,
        }) 
    }
})
router.put('/:id', (req, res)=> {
    const {title, contents} = req.body // pull title/contents from req.body
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        })
    } else {
        console.log('wta')
    }
})
router.get('/:id/messages', (req, res)=> {

})



module.exports = router