const express = require('express');
const Datahubs = require('../db/db.js');
const router = express.Router();

//POST	/api/posts	Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
	const { title, contents } = req.body;
	!title || !contents
		? res.status(400).json({
				success: false,
				errorMessage: 'Please provide title and contents for the post.',
		  })
		: console.log('title', title);
	Datahubs.insert({ title, contents })
		.then((data) => {
			console.log('post test');
			res.status(201).json(data);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				errorMessage:
					'There was an error while saving the post to the database',
				error,
			});
		});
});
//POST /api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
	const post_id = req.params.id;
	const { text } = req.body;
	let newComment = {
		text,
		post_id,
	};
	Datahubs.findById(post_id).then((post) => {
		!post
			? res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' })
			: !text
			? res
					.status(400)
					.json({ errorMessage: 'Please provide text for the comment.' })
			: Datahubs.insertComment(newComment)
					.then(({ id }) => {
						Datahubs.findCommentById(id).then((comment) => {
							res.status(201).json(comment);
						});
					})
					.catch((err) => {
						res.status(500).json({
							message:
								'There was an error while saving the comment to the database',
						});
					});
	});
});

//GET /api/posts Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
	Datahubs.find(req.query)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				errorMessage: 'The posts information could not be retrieved.',
				err,
			});
		});
});

//GET /api/posts/:id	Returns the post object with the specified id.
router.get('/:id', (req, res) => {
	const { id } = req.params;
	!id
		? res.status(404).json({
				success: false,
				errorMessage: 'The post with the specified ID does not exist.',
		  })
		: Datahubs.findById(id)
				.then((data) => {
					res.status(200).json(data);
				})
				.catch((err) => {
					res.status(500).json({
						success: false,
						errorMessage: 'The post information could not be retrieved.',
						err,
					});
				});
});

//GET /api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
	const { id } = req.params;
	!id
		? res.status(404).json({
				success: false,
				errorMessage: 'The post with the specified ID does not exist.',
		  })
		: Datahubs.findPostComments(id)
				.then((data) => {
					res.status(200).json(data);
				})
				.catch((err) => {
					res.status(500).json({
						success: false,
						errorMessage: 'The comments information could not be retrieved.',
						err,
					});
				});
});

//DELETE /api/posts/:id	Removes the post with the specified id and returns the deleted post object.You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Datahubs.findById(id)
		.then((data) => {
			data
				? Datahubs.remove(id)
						.then((i) => {
							if (i) {
								res.status(200).json({
									message: `Post ${id} was Deleted`,
									info: data,
								});
							}
						})
						.catch((err) => {
							console.log(err);
							res.status(500).json({
								error: 'The post could not be removed',
							});
						})
				: res.status(404).json({
						message: 'The post with the specified ID does not exist.',
				  });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: 'The post information could not be retrieved.',
			});
		});
});

module.exports = router;
