// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

router.get("/api/posts", (req, res) => {
	Posts.find(req.query)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "The posts information could not be retrieved",
			});
		});
});

router.get("/api/posts/:id", (req, res) => {
	Posts.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "The post information could not be retrieved",
			});
		});
});

router.post("/api/posts", (req, res) => {
	const { title, contents } = req.body;
	if (title && contents) {
		Posts.insert(req.body)
			.then(({ id }) => {
				Posts.findById(id).then((post) => {
					res.status(201).json(post);
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: "There was an error while saving the post to the database",
				});
			});
	} else {
		res.status(400).json({
			message: "Please provide title and contents for the post",
		});
	}
});

router.put("/api/posts/:id", (req, res) => {
	const { title, contents } = req.body;
	if (title && contents) {
		Posts.update(req.params.id, req.body)
			.then((count) => {
				if (count > 0) {
					Posts.findById(req.params.id).then((post) => {
						res.status(200).json(post);
					});
				} else {
					res.status(404).json({
						message: "The post with the specified ID does not exist",
					});
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: "The post information could not be modified",
				});
			});
	} else {
		res.status(400).json({
			message: "Please provide title and contents for the post",
		});
	}
});

router.delete("/api/posts/:id", (req, res) => {
	Posts.findById(req.params.id).then((post) => {
		if (post) {
			Posts.remove(req.params.id)
				.then((count) => {
					if (count) {
						res.status(200).json(post);
					}
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({
						message: "The comments information could not be retrieved",
					});
				});
		} else {
			res.status(404).json({
				message: "The post with the specified ID does not exist",
			});
		}
	});
});

router.get("/api/posts/:id/comments", (req, res) => {
	Posts.findPostComments(req.params.id)
		.then((comments) => {
			console.log(comments);
			if (comments.length) {
				res.status(200).json(comments);
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "The comments information could not be retrieved",
			});
		});
});

module.exports = router;
