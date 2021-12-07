// implement your posts router here
const Post = require("./posts-model");
const express = require("express")
const router = express.Router()

router.get("/", (req, res) =>{
	Post.find(req.query)
	.then(post =>{
		res.status(200).json(post);
	})
	.catch(err =>{
		console.log(err)
		res.status(500).json({
			message: "err"
		})
	})
})

module.exports = router