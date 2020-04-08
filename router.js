const express = require('express');

const Posts = require('./data/db');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.find(req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        return res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;

  Posts.findPostComments(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        return res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The comments information could not be retrieved.' });
    });
});

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    Posts.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = { ...req.body, post_id: id };
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide text for the comment.' });
  } else {
    Posts.findById(id)
      .then(post => {
        if (!post.length) {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        } else {
          Posts.insertComment(comment)
            .then(comment => {
              res.status(201).json(comment);
            })
            .catch(error => {
              res.status(500).json({
                error:
                  'There was an error while saving the comment to the database'
              });
            });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.put('/:id', (req, res) => {
  const post = req.body;
  const { id } = req.params;
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    Posts.update(id, post)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: 'The post information could not be modified' });
      });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json({ message: 'The post has been deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'The post could not be recovered' });
    });
});

module.exports = router;