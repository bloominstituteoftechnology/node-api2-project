const express = require('express');

const Comments = require('../data/db');

const router = express.Router();

//Post Comments-------------------------------------
router.post('/:id/comments', async (req, res) => {
  try {
    const found = await Comments.findById(req.params);

    if (!req.body) {
      res.status(404).json({
        message: `Please provide text for comment.`
      });
    } else if (found.length > 0) {
      const { id } = await Comments.insertComment(req.body);
      const newComment = await Comments.findCommentById(id);
      res.status(201).json(newComment[0]);
    } else {
      res.status(404).json({
        message: 'The post with the specified ID does not exist.'
      });
    }
  } catch {
    res.status(500).json({
      errorMessage:
        'There was an error while saving the comment to the database'
    });
  }
});
//Get Comments--------------------------------------
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comments.findPostComments(req.params.id);
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: 'No Comment to Display' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: 'Error retrieving the comments for this post'
    });
  }
});
module.exports = router;
