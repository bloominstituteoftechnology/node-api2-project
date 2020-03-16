const express = require('express');

const Posts = require('./db.js');

const router = express.Router(); // Don't forget to export it at the end!!!

router.get('/', (req, res) => {
  Posts.find(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the posts', error,
      });
    });
});

router.post('/', (req, res) => {
  const postInfo = req.body;

  if (typeof postInfo.title === 'undefined' || typeof postInfo.contents === 'undefined') {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  } else {
    Posts.insert(postInfo)
      .then((post) => {
        res.status(201).json({ success: true, post });
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: 'There was an error while saving the post to the database', err });
      });
  }
});

router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const body = req.body.text;

  if (req.body.text) {
    Posts.findById(id)
      .then((post) => {
        if (post.length > 0) {
          Posts.insertComment({ text: body, post_id: Number(id) })
            .then((commentID) => {
              Posts.findCommentById(commentID.id)
                .then((comment) => res.status(201).json({ success: true, comment }));
            })
            .catch((err) => res.status(500).json({ error: 'There was an error while saving the comment to the database', err }));
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      });
  } else {
    res.status(400).json({ errorMessage: 'Please provide text for the comment' });
  }
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({ success: true, post });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'The comments information could not be retrieved.', err });
    });
});

router.get('/:id/comments', (req, res) => {
  Posts.findCommentById(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(200).json({ success: true, comment });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'The comments information could not be retrieved.', err });
    });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).end();
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'The post could not be removed', err });
    });
});

router.put('/:id', (req, res) => {
  const postData = req.body;
  const { id } = req.params;
  if (!postData.title || !postData.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  } else {
    Posts.update(id, postData)
      .then((post) => {
        if (post) {
          res.status(200).json({ success: true, post });
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: 'The user information could not be modified.', err });
      });
  }
});

module.exports = router;
