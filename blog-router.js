const db = require('./data/db');
const express = require('express');
const router = express.Router();

//POST

router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content === {}) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    db.insert(req.body)
      .then(posts => {
        res.status(201).json(req.body);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'There was an error while saving the post to the database'
        });
      });
  }
});

router.post('/:id/comments', (req, res) => {
  const info = req.body;
  const id = req.params.id;

  info.post_id = id;

  db.insertComment(info)
    .then(comments => {
      if (info) {
        res.status(201).json(info);
      }
    })

    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the comments '
      });
    });
});

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts'
      });
    });
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'posts not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts'
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      post
        ? db
            .remove(id)
            .then(deleted => {
              if (deleted) {
                res.status(204).json(post);
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: 'The post could not be removed'
              });
            })
        : res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post'
      });
    });
});
router.get('/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'comments not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the comments '
      });
    });
});

module.exports = router;
