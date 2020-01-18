const express = require('express');

const db = require('./data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
	db
		.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The posts information could not be retrieved' });
		});
});

// todo come back and test the 500 error
router.get('/:id', (req, res) => {
	const id = req.params.id;

	db
		.findById(id)
		.then((post) => {
			if (post.length > 0) {
				console.log(post);
				res.status(200).json(post);
			} else {
				res.status(404).json({ error: 'The post with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'the post information could not be retrieved' });
		});
});

router.get('/:id/comments', (req, res) => {
	const { id } = req.params;

	db
		.findPostComments(id)
		.then((comments) => {
			if (comments.length > 0) {
				res.status(200).json(comments);
			} else {
				res.status(404).json({ error: 'the post with that specified id does not exist' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

router.post('/', (req, res) => {
	const newPost = req.body;
	console.log(newPost);
	if (newPost.title && newPost.contents) {
		db
			.insert(newPost)
			.then((id) => {
				res.status(201).json(id);
			})
			.catch((err) => [
				res.status(500).json({ error: 'There was an error while saving the post to the database' })
			]);
	} else {
		res.status(400).json({ error: 'Please provide a title and contents for the post' });
	}
});

//Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
	const comment = req.body;
	comment.post_id = req.params.id;

	if (comment.text.length > 0) {
		db
			.insertComment(comment)
			.then((id) => {
				if (id) {
					console.log(id);
					res.status(201).json(id);
				} else {
					res.status(500).json({ error: 'there was an error while saving this comment to the database.' });
				}
			})
			.catch((err) => {
				res.status(404).json({ error: 'the post with the specified id does not exist' });
			});
	} else {
		res.status(400).json({ error: 'please provide text for the comment' });
	}
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	db
		.remove(id)
		.then((deleted) => {
			if (deleted) {
				console.log(deleted);
				res.status(200).json({ message: 'record deleted' });
			} else {
				res.status(404).json({ error: 'the post with the specified id does not exist' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'the post could not be removed' });
		});
});

router.put('/:id', (req, res) => {
	const changes = req.body;
	const { id } = req.params;

	if (changes.title && changes.contents) {
		db
			.update(id, changes)
			.then((record) => {
				if (record) {
					res.status(200).json(record);
				} else {
					res.status(404).json({ error: 'the post with the specified id does not exist' });
				}
			})
			.catch((error) => {
				res.status(500).json({
					message: 'The post information could not be modified'
				});
			});
	} else {
		res.status(400).json({ error: 'please provide title and contents for the post' });
	}
});

module.exports = router;
