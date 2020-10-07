const router = require('express').Router()
const posts = require('../data/db')



router.post('/api/posts', (req, res) =>{
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing user title or contents",
		})
	}

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the post",
			})
		})
})


router.post('/api/posts/:id/comments', (req, res) =>{
    if (!req.body.comments) {
		return res.status(400).json({
			message: "Need a comments value",
		})
	}

	posts.insertComment({post_id:req.params.id, text:req.body.text})
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			// log out the error so the developers can see it
			console.log(error)

			// but don't send it back to the client for security purposes
			res.status(500).json({
				message: "Could not create user post",
			})
		})

})


router.get('/api/posts', (req, res) =>{
    posts.find(req.query)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts",
			})
		})
})


router.get('/api/posts/:id', (req, res) =>{
    posts.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "Post not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the post",
			})
		})
})


router.get('/api/posts/:id/comments', (req, res) =>{
    posts.findPostComments(req.params.id)
		.then((postId) => {
			res.json(postId)
		})
		.catch((error) => {
			// log out the error so the developers can see it
			console.log(error)

			// but don't send it back to the client for security purposes
			res.status(500).json({
				message: "Could not get user post",
			})
		})
})


router.delete('/api/posts/:id', (req, res) =>{
    posts.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the post",
			})
		})
})


router.put('/api/posts/:id', (req, res) =>{
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing user title or contents",
		})
	}

	posts.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the post",
			})
		})
})


module.exports = router;