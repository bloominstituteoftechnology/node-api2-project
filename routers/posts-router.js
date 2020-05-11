const express = require('express');

//Import db from db.js-----------------------------
const Posts = require('../data/db.js');

//Call Router Function from Express----------------
const router = express.Router();

//Post New post-------------------------------------

router.post('/:id/comments', async (req, res) => {
  const comment = { ...req.body, post_id: req.params.id };

  try {
    const newComment = await Posts.insertComment(comment);
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: 'The comments information could not be retrieved.'
    });
  }
});

//Get * Posts---------------------------------------
router.get('/', (req, res) => {
  //   console.log(req.query);
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'The posts information could not be retrieved.'
      });
    });
});

//Get Post by ID--------------------------------------
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id).then(post => {
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: `The Post with the ID of ${req.params.id}  does not exist.`
      });
    }
  });
});

//Delete Post by ID---------------------------------------
router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      if (post) {
        res
          .status(200)
          .json({ message: `The Post with ID ${req.params.id} Deleted` });
      } else {
        res.status(404).json({
          message: `The post with  ID ${req.params.id} does not exist.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error removing Post' });
    });
});
// Update Post-------------------------------------------------
router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: `The post with the  ID ${req.params.id} does not exist.`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    });
});
//Export router Module-----------------------------------------
module.exports = router;
