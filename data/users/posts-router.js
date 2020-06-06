const express = require("express");
const posts = require("../db");

// creates a new standalone express router
const router = express.Router();

//POST
router.post("/posts", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: "Please provide title and contents for the post.",
		});
	}

	posts
		.insert(req.body)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((error) => {
			console.log(error);
			res
				.status(500)
				.json({
					error: "There was an error while saving the post to the database",
				});
		});
});

//```````MAY NEED HELP HERE```````
router.post("/posts/:id/comments", (req, res) => {
	posts
		.insertComment(req.params.ids)
		.then((post) => {
			if (!text) {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			} else {
				return posts.findCommentsById(req.params.id);
			}
		})
		.then((comments) => {
			res.json(comments);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: "There was an error while saving the comment to the database",
			});
		});
});

//GET
router.get("/posts", (req, res) => {
	posts
		.find({
			sortBy: req.query.sort,
			limit: req.query.limit,
		})
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: "The posts information could not be retrieved.",
			});
		});
});

router.get("/posts/:id", (req, res) => {
	posts
		.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: "The post information could not be retrieved.",
			});
		});
});

router.get("/posts/:id/comments", (req, res) => {
	posts
		.findById(req.params.id)
		.then((post) => {
			if (!post) {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			} else {
				return posts.findPostComments(req.params.id);
			}
		})
		.then((comments) => {
			res.json(comments);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Error getting the post",
			});
		});
});

//DELETE
router.delete("/posts/:id", (req, res) => {
	posts
		.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The message has been deleted.",
				});
			} else {
				res.status(404).json({
					message: "The post with specified ID doesn't exist.",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: "The post could not be removed.",
			});
		});
});

//UPDATE
router.put("/posts/:id", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: "Please provide title and contents for the post.",
		});
	}

	posts
		.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res
				.status(500)
				.json({ error: "The post information could not be modified." });
		});
});

module.exports = router;
