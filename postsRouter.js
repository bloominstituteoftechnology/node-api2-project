const express = require('express');
const posts = require('./data/db.js');

const router = express.Router();

// ** Get all posts **
// Success: 200. Array of all posts
// Failure: 500.
//   { error: "The posts information could not be retrieved." }
router.get('/', (req, res) => {
  posts.find()  // Gets all posts
    .then(posts => res.status(200).json(posts))
    .catch(err => console.log(err));
});

// ** Get specific post **
// Success: 200. Single post object
// Not found: 404.
//   { message: "The post with the specified ID does not exist." }
// Failure: { error: "The post information could not be retrieved." }
router.get('/:id', (req, res) => {
  const id = req.params.id;
  posts.findById(id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      }
      else {
        console.log(`Request for post ${id}: not found.`);
        res.status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// ** Get all comments for a post **
// Success: 200. Array of all comments associated with post ID
// Not found: 404.
//   { message: "The post with the specified ID does not exist." }
// Failure: 500.
//   { error: "The comments information could not be retrieved." }
router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  posts.findById(id)
    .then(post => {
      if (post.length) { // Post is found. Now get comments...
        posts.findPostComments(id)
          .then (comments => {
            res.status(200).json(comments);
          })
          .catch(err => {
            console.log("Error retrieving comments:", err);
            res.status(500).json(
              { error: "The comments information could not be retrieved." });
          })
      }
      else {
        console.log(`Request for post ${id} comments: not found.`);
        res.status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// ** Create a new post **
// Success: 201. Return newly created post.
// Missing Title or Contents: 400.
//   { errorMessage: "Please provide title and contents for the post." }
// Failure: 500.
//   { error: "There was an error while saving the post to the database" }
router.post('/', (req, res) => {
  const postData = req.body;
  console.log("Attempting to add post:", postData);
  if( !postData.title || !postData.contents ) {
    res.status(400).json({ 
      errorMessage: "Please provide title and contents for the post."
    });
  }
  else {
    posts.insert(postData)
      .then(post => {
        res.status(201).json(post); // TODO: This is only returning the ID
      })
      .catch(err => {
        console.log("Error posting message:", err);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      })
  }
});

// ** Create a new comment **
// Success: 201. Return newly created comment
// Post ID not found: 404.
//   { message: "The post with the specified ID does not exist." }
// Missing "text" property: 400.
//   { errorMessage: "Please provide text for the comment." }
// Failure: 500.
//   { error: "There was an error while saving the comment to the database" }
router.post('/:id/comments', (req, res) => {
  const commentData = req.body;
  commentData.post_id = req.params.id;
  console.log("Attempting to add comment:", commentData);
  if( !commentData.text ) {
    res.status(400).json({ 
      errorMessage: "Please provide text for the comment."
    });
  }
  else {
    posts.insertComment(commentData)
    .then(comment => {
      res.status(201).json(comment); // TODO: Doesn't return the comment
    })
    .catch(err => {
      console.log("Error posting comment:", err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    })
  }
});

// ** Modify a post **
// Success: 200. Return newly updated post.
// Not found: 404.
//   { message: "The post with the specified ID does not exist." }
// Missing title or contents property:
//   { errorMessage: "Please provide title and contents for the post." }
// Failure: 500. { error: "The post information could not be modified." }
router.put('/:id', (req, res) => {
  const postData = req.body;
  const id = req.params.id;
  console.log(`Attempting to modify post ${id}:`, postData);
  if( !postData.title || !postData.contents ) {
    res.status(400).json({ 
      errorMessage: "Please provide title and contents for the post."
    });
  }
  else {
    posts.update(id, postData)
      .then(updated => {
        if (updated) {
          posts.findById(id)
            .then (post => res.status(201).json(post));
        }
      })
      .catch(err => {
        console.log(`Error updating message ${id}:`, err);
        res.status(500).json({
          error: "The post information could not be modified."
        });
      })
  }


});

// ** Delete a post **
// Success: 200? Return deleted post object.
// Not found: 404.
//   { message: "The post with the specified ID does not exist." }
// Failure: 500. { error: "The post could not be removed" }
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  posts.findById(id)
    .then(deleting => {
      if (deleting.length) { // Found it
        posts.remove(id)
        .then(removed => {
          res.status(200).json(deleting);
        })
        .catch(err => {
          console.log("Deletion error:", err);
          res.status(500).json({ // Database error
            error: "The post could not be removed"
          })
        })
      }
      else {  // Post ID not found.
        console.log(`Cannot delete post ${id}. Not found`);
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch (err => { // We'll get here if findById() fails.
      console.log(`Cannot delete post ${id}. Not found.`, err);
      res.status(500).json({
        error: "The post could not be removed"
      });
    })
});

module.exports = router;