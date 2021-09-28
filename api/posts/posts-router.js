// implement your posts router here
const express = require("express")
const Posts = require('./posts-model')
const router = express.Router();

router.get("/", (req, res) => {
	Posts.find()
		.then((posts) => {
			res.json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "The posts information could not be retrieved",
				error: error.message,
				stack: error.stack,
			});
		});
});



module.exports = router;