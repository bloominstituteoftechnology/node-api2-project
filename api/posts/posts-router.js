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

})
router.delete('/:id', (req, res)=> {

})
router.put('/:id', (req, res)=> {

})
router.get('/:id/messages', (req, res)=> {

})



module.exports = router