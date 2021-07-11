// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();
/*[GET] /api/posts
✓ [1] can get the correct number of posts
✓ [2] can get all the correct posts 
*/
router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

/* GET] /api/posts/:id
✓ [3] can get all the correct posts by id
✓ [4] reponds with a 404 if the post is not found 
*/
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the post" });
    });
});

/*[POST] /api/posts 
✓ [5] responds with a 201 
✕ [6] responds with a new post
✓ [7] on missing title or contents responds with a 400 
*/
router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.insert(post)
      .then((newPost) => {
        console.log(newPost);
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error creating post",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});
/*[PUT] /api/posts/:id
✕ [8] responds with updated user
✓ [9] saves the updated user to the db
✓ [10] responds with the correct message & status code on bad id
✓ [11] responds with the correct message & status code on validation problem 
*/
router.put("/:id", async (req, res) => {
  try {
    const possiblePost = await Post.findById(req.params.id);
    if (!possiblePost) {
      res.status(404).json({
        message:
          "Please provide title and contents, The post with the specified ID does not exist",
      });
    } else {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          message: "Please provide title and contents",
        });
      } else {
        const updatePost = await Post.update(req.params.id, req.body);
        res.status(200).json(updatePost);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "error updating post",
      err: err.message,
      stack: err.stack,
    });
    const post = await Post.update(req.params.id, req.body);
    if (!post) {
      res.status(400).json({ message: `user ID does not exist` });
    } else {
      res.status(200).json(post);
    }
  }
});

module.exports = router;
