const express = require("express");

const post = require("../data/db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title: title, contents: contents };

  try {
    if (!title && !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post.",
      });
    } else {
      let data = await post.insert(newPost);
      console.log(data);
      res.status(201).json(newPost);
    }
  } catch {
    res.status(500).json({
      error: "There was an error while saving the post to the database",
    });
  }
});

router.post("/:id/comments", (req, res) => {
  const newComment = { post_id: req.params.id, text: req.body.text };
  post
    .insertComment(newComment)
    .then((data) => {
      if (!data.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(201).json(data);
      }
    })
    .catch((error) => {
      console.log(error.message, error.stack);
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.get("/", (req, res) => {
  post
    .find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  post
    .findById(id)
    .then((data) => {
      if (!data.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.get("/:id/comments", (req, res) => {
  post
    .findCommentById(req.params.id)
    .then((data) => {
      if (!data.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.delete("/:id", (req, res) => {
  post
    .remove(req.params.id)
    .then((data) => {
      if (data.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res
          .status(202)
          .json({
            message: `The post with the id ${req.params.id} was deleted`,
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newPost = req.body;
  post.update(id, newPost).then((data) => {
    if (data.length === 0) {
      res.status(404).json({ message: 'there was an error updating the post. Please chack that the id and body are correct'})
    } else {
        res.status(200).json(newPost)
    }
  });
});

module.exports = router;