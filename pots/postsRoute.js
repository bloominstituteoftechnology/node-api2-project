const express = require('express');

const router = express.Router();
let database = require('../data/db.js');
// this is a router file that is on the /posts route so our / is equal to /api/posts

// get routines
router.get('/', (req, res) => {
	database
		.find()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json({ errorMessage: 'The posts information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	database
		.findById(req.params.id)
		.then((data) => {
			if (data.length > 0) {
				res.status(200).json(data);
			} else {
				res.status(404).json({ errorMessage: 'The post with the specified ID does not exit.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ errorMessage: 'The post information could not be retrieved.' });
		});
});

router.get('/:id/comments', (req, res) => {
	database
		.findPostComments(req.params.id)
		.then((data) => {
			if (data.length > 0) {
				res.status(200).json(data);
			} else {
				res.status(404).json({ errorMessage: 'The post with the specified ID does not exit.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ errorMessage: 'The post information could not be retrieved.' });
		});
});

// post routines
router.post('/', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
	} else {
		database
			.insert({ title: req.body.title, contents: req.body.contents })
			.then((data) => {
				res.status(201).json({ title: req.body.title, contents: req.body.contents, id: data.id });
			})
			.catch((err) => {
				res.status(500).json({ errorMessage: 'There was an error while saving the post to the database.' });
			});
	}
});

router.post('/:id/comments', (req, res) => {
	if (!req.body.text) {
		res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
	} else {
		database.findPostComments(req.params.id).then((data) => {
			if (data.length > 0) {
				database
					.insertComment({ text: req.body.text, post_id: req.params.id })
					.then((data2) => {
						res.status(201).json({ text: req.body.text, post_id: req.params.id });
					})
					.catch((err) => {
						res
							.status(500)
							.json({ errorMessage: 'There was an error while saving the comment to the database.' });
					});
			} else {
				res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' });
			}
		});
	}
});

// put/update routines

router.put('/:id', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
	} else {
		database
			.update(req.params.id, { title: req.body.title, contents: req.body.contents })
			.then((data) => {
				if (data == 1) {
					res.status(200).json({ title: req.body.title, contents: req.body.contents });
				} else {
					res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' });
				}
			})
			.catch((err) => {
				res.status(500).json({ errorMessage: 'The post information count not be modified.' });
			});
	}
});

// delete routines
router.delete('/:id', (req, res) => {
	database
		.findById(req.params.id)
		.then((data) => {
			if (data.length > 0) {
				database
					.remove(req.params.id)
					.then((data2) => {
						res.status(200).json(data);
					})
					.catch((err) => {
						res.status(500).json({ errorMessage: 'The post could not be removed.' });
					});
			} else {
				res.status(404).json({ errorMessage: 'The post with the specified ID does not exit.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ errorMessage: 'The post could not be removed.' });
		});
});

module.exports = router;
