// implement your posts router here
const Posts = require('./posts/posts-model');

// require your posts router and connect it here

server.get('/api/posts', (req, res) => {
    Posts.find()
    .then(posts=>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

server.get('/api/posts/:id', (req, res) => {
    const idVar = req.params.id
    Posts.findById(idVar)
    .then(posts =>{
        if(!posts){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(posts)
        }
    })
    .catch(err =>{
        res.status(500).json({message:err.message})
    })
})

server.post('/api/posts', (req, res) => {
    const newPost = req.body
    if(!newPost.title || !newPost.content){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        Post.insert(newPost)
        .then(post=>{
            res.status(201).json(post)
        })
        .catch(err=>{
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
})

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params
    const post = req.body

    try{
        if(!changes.title || !changes.content){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            const updatedPost = await Post.update(id , post)
            if(!updatedPost){
                res.status(500).json({ message: "The post information could not be modified" })
            }else{
                res.status(200).json(updatedPost)
            }
        }
    }catch(err){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }
})

server.delete('/api/posts/:id', (req, res) => {
    try{
        const {id} = req.params
        const deletedPost = await Post.remove(id)
        if(!deletedPost){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(201).json(deletedPost)
        }
    }catch(err){
        res.status(500).json({ message: "The post could not be removed" })
    }
})

server.get('/api/posts/:id/comments', (req, res) => {
    const idVar = req.params.id
    Posts.findById(idVar)
    .then(comments=>{
        if(!comments){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(comments)
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})