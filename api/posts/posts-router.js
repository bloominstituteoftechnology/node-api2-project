const express = require("express");
const Post = require("./posts-model");

const router = express.Router();

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
        err: err.message,
        stack: err.stack,
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.insert(post)
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((newPost) => {
        console.log(newPost);
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.findById(req.params.id)
      .then((posts) => {
        if (!posts) {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        } else {
          return Post.update(req.params.id, req.body);
        }
      })
      .then((data) => {
        if (data) {
          return Post.findById(req.params.id);
        }
      })
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "The post information could not be retrieved",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const possiblePost = await Post.findById(req.params.id);
    if (!possiblePost) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      await Post.remove(req.params.id);
      res.status(200).json(possiblePost);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
      err: err.message,
      stack: err.stack,
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const possiblePost = await Post.findById(req.params.id);
    if (!possiblePost) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      const comments = await Post.findPostComments(req.params.id);
      res.json(comments);
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved",
      err: err.message,
      stack: err.stack,
    });
  }
});

module.exports = router;
