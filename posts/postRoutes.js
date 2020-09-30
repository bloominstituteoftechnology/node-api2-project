const express = require('express');
const db = require('../data/db');
const router = express.Router();
router.use(express.json());

// Get all Posts
router.get('/', async (req, res) => {
	try {
		const posts = await db.find();
		if (posts.length > 0) {
			res.status(200).json(posts);
		} else {
			res.status(200).json({ message: 'No Posts Yet!' });
		}
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'The posts information could not be retrieved.' });
	}
});

//Get Post by ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const post = await db.findById(id);
		if (post.length > 0) {
			res.status(200).json(post);
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'The post information could not be retrieved.' });
	}
});

//Get Comments
router.get('/:id/comments', async (req, res) => {
	const { id } = req.params;
	const post = await db.findById(id);

	if (post.length > 0) {
		try {
			const comments = await db.findPostComments(id);
			res.status(200).json(comments);
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ message: 'The comments information could not be retrieved.' });
		}
	} else {
		res
			.status(404)
			.json({ message: 'The post with the specified ID does not exist.' });
	}
});

//Create new post
router.post('/', async (req, res) => {
	const post = req.body;
	if (!post.title || !post.contents) {
		res
			.status(400)
			.json({ message: 'Please provide title and contents for the post.' });
	} else {
		try {
			const newPost = await db.insert(post);
			res.status(201).json({ ...newPost, ...post });
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error: 'There was an error while saving the post to the database',
			});
		}
	}
});

//New Comment
router.post('/:id/comments', async (req, res) => {
	const { id } = req.params;
	// console.log(comment.length);
	if (req.body.text) {
		const comment = {
			text: req.body.text,
			post_id: id,
		};
		try {
			const post = await db.findById(id);
			if (post.length > 0) {
				const commentID = await db.insertComment(comment);
				const newComment = await db.findCommentById(commentID.id);
				res.status(201).json(newComment[0]);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: 'There was an error while saving the comment to the database',
			});
		}
	} else {
		res.status(400).json({ message: 'Please provide text for the comment.' });
	}
});

// Delete Post
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const post = await db.findById(id);
	if (post.length > 0) {
		try {
			const deleted = await db.remove(id);
			res.status(200).json(post);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'The post could not be removed' });
		}
	} else {
		res
			.status(404)
			.json({ message: 'The post with the specified ID does not exist.' });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	if (!body.title || !body.contents) {
		res
			.status(400)
			.json({ message: 'Please provide title and contents for the post.' });
	} else {
		const post = await db.findById(id);
		if (post.length > 0) {
			try {
				const updatedPost = await db.update(id, body);
				const post = await db.findById(id);
				res.status(200).json(post);
			} catch (error) {
				console.log(error);
				res
					.status(500)
					.json({ message: 'The post information could not be modified.' });
			}
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		}
	}
});

module.exports = router;
