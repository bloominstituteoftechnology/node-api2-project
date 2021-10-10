// implement your posts router here
const  Post  =  require('./posts-model')
const  express  =  require("express")
const router = express.Router()

router.get ('/', (req, res) => {
    Post.find(req)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: 'The posts information could not be retrieved'})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Post.findById(id)
    .then(post => {
        if(!post){
            res.status(404).json('The post with the specified id does not exist')
        } else {
            res.json(post)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Post.findById(id)
    .then(post => {
        if(!post){
            res.status(404).json('The post with the specifed id does not exist')
        } else {
            res.json(post)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message})
    })
})

router.post ('/', (req, res) => {
    const newPost = req.body
    Post.insert(newPost)
    .then(post => {
        res.status(201).json(newPost)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error adding the post'
        })
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Post.update(req.params.id, changes)
    .then(post => {
        if(post) {
            res.status(200).json(changes);
        } else {
            res.status(404).json({ message: 'The post could not be found' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the adopter',
        })
    })
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
    .then(count => {
        if (count > 0) {
        res.status(200).json({message: 'The post has been destoryed'})
        } else {
            res.status(404).json({ message: 'The post could not be found' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error removing the post',
        })
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Post.findCommentById(id)
    .then(comment => {
        if(!comment){
            res.status(404).json('The post with the specifed id does not have comments')
        } else {
            res.json(comment)
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message})
    })
})

module.exports = router