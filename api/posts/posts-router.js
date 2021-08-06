const express = require("express");
const Post = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
	console.log("post endpoint");
	Post.find(req.query) // what is this???
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the posts",
			});
		});
});

router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "The post information could not be retrieved",
			});
		});
});

router.post("/", (req, res) => {
	Post.insert(req.body)
		.then((post) => {
			Post.findById(post.id).then((posts) => {
				res.status(201).json(posts);
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json({
				message: "Error adding the post",
			});
		});
});

router.put("/:id", (req, res) => {
	const changes = req.body;
	if (!changes["title"] || !changes["contents"]) {
		res
			.status(400)
			.json({ message: "Please provide title and contents for the post" });
	}
	Post.update(req.params.id, changes)
		.then((post) => {
			if (post) {
				Post.findById(req.params.id).then((id) => {
					res.status(200).json(id);
				});
			} else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "The post information could not be modified",
			});
		});
});

router.delete("/:id", async (req, res) => {
	try {
		const delPost = await Post.findById(req.params.id);
		if (!delPost) {
			res
				.status(404)
				.json({ message: "The post with the specified ID does not exist" });
		} else {
			const item = await Post.remove(req.params.id);
			res.json(delPost);
		}
	} catch (err) {
		res.status(500).json({ message: "The post could not be removed" });
	}
});

router.get("/:id/comments", (req, res) => {
	Post.findById(req.params.id)
		.then((postID) => {
			if (postID === req.params.id) {
				res.status(200).json(postID);
			} else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "The comments information could not be retrieved",
			});
		});
});

module.exports = router;
