const { response } = require('../server');
const Post = require('./posts-model');

// implement your posts router here
const router = require('express').Router();

router.get('/api/posts', (request, result) => {
    Post.find()
    .then(post => {
        result.status(200).json(post)
    })
    .catch(error => {
        result.status(500).json({
            error: 'The posts information could not be retrieved',
            message: error.message,
            stack: error.stack
        })
    })
})

router.get('/api/posts:id', async (request, result) => {
    try {
        const post = await Post.findById(request.params.id)
        if (!post) {
            result.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            result.json(post)
        }
    } catch (error) {
        result.status(500).json({
            error: 'The post information could not be retrieved!',
            message: error.message,
            stack: error.stack
        })
    }
})

router.get('/api/posts/:id/comments)', async (request, respone) => {
    Post.findPostComments(request.params.id)
    .then(post => {
        if (post.length > 0) {
            response.status(200).json(post);
        } else {
            response.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(error => {
        response.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})

router.post('/api/posts', async (request, res) => {
    try {
        const postFromClient = request.body
        if (!postFromClient.title || !postFromClient.contents) {
            res.status(422).json({
                message: 'Please provide title and contents for the post',
            })
        } else {
            const newPost = await Post.insert(postFromClient)
            res.status(201).json(newPost)
        }
    } catch (error) {
        res.status(500).json({
            error: 'There was an error while saving the post to the database',
            message: error.message,
            stack: error.stack
        })
    }
})

router.put('/api/posts/:id', async (request, response) => {
    try {
        const post = await Post.findById(request.params.id)
        const {id } = request.params
        const {title, contents} = request.body
        const updatedPost = await Post.update(id, { title, contents })
        if (!updatedPost) {
            response.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else if (!post) {
            response.status(404).json({
                message: 'The post with the specified ID does not exist'
        })} else {
            response.status(200).json(updatedPost)
        }}
    catch (error) {
        response.status(500).json({
            error: 'The post with the specified ID does not exist',
            message: error.message,
            stack: error.stack
        })
}})

router.delete('/api/posts/:id', (request, response) => {
    Post.remove(request.params.id)
    .then(deletedPost => {
        if (!deletedPost) {
            response.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {response.json(deletedPost)}
    })
    .catch(error => {
        response.status(500).json({
            
            error: 'The post could not be removed',
            message: error.message,
            stack: error.stack
        })
    })
    }
)
module.exports = router;