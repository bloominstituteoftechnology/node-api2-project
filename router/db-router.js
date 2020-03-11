const express = require("express");
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
	db.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(() => {
			res
				.status(500)
				.json({ error: 'The posts information could not be retrieved.' });
		});
});

router.get('/:id/comments', (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: 'please include an id in the URL' });
	} else {
		db.findPostComments(req.params.id)
			.then(comments => {
				if (!comments) {
					res
						.status(404)
						.json({ error: 'The post with the specified ID does not exist.' });
				} else {
					res.status(200).json(comments);
				}
			})
			.catch(error => {
				console.log('error for blog post comments', error);
				res
					.status(500)
					.json({ error: 'The comments information could not be retrieved.' });
			});
	}
});


router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }
  posts
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    });
});

router.post('/:id/comments', (req, res) => {
	if (!req.params.id || !req.body.text || !req.body.post_id) {
		res
			.status(400)
			.json({ error: 'Please provide text for the comment' });
	} else {
		db.insertComment(req.body)
			.then(commentID => {
				res.status(201).json(commentID);
			})
			.catch(error => {
				console.log('comment post error', error);
				res.status(404).json({
					error: 'The post with the specified ID does not exist.'
				});
			});
	}
});

router.put('/:id', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		res
			.status(400)
			.json({ error: 'Please provide title and contents for the post.' });
	} else {
		db.update(req.params.id, req.body)
			.then(() => {
				db.findById(req.params.id)
					.then(post => {
						res.status(200).json(post);
					})
					.catch(error => {
						res
							.status(500)
							.json({ error: 'The updated post could not be found', err });
					});
			})
			.catch(error => {
				console.log('error from update post', error);
				res
					.status(500)
					.json({ error: 'The post information could not be modified' });
			});
	}
});

router.delete('/:id', (req, res) => {
	db.findById(req.params.id)
		.then(selectedPost => {
			db.remove(req.params.id)
				.then(() => {
					 res.status(200).json(selectedPost);
				})
				.catch(error => {
					console.log('error from removing post', error);
					res.status(500).json({ error: 'The post could not be removed.' });
				});
		})
		.catch(() => {
			res
				.status(404)
				.json({ error: 'The post with the specified ID does not exist.' });
		});
});
  
  module.exports = router;