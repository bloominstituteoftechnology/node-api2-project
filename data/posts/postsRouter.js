const express = require("express");

const db = require("../db.js");

const router = express.Router();

let comment = {
  text: "",
  post_id: "",
  created_at: Date.now(),
  updated_at: Date.now(),
};

router.get("/", (req, res) => {
  db.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
        .end();
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then((post) => {
      if (post.length == 0) {
        res
          .status(404)
          .json({ error: "The post with that ID can not be found." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The posts information can not be found." })
        .end();
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  db.findPostComments(id)
    .then((comment) => {
      if (comment.length === 0) {
        res
          .status(404)
          .json({ error: "The comment with the specified ID does not exist." });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The comment information could not be retrieved." })
        .end();
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "please make sure to send a valid title and valid contents",
    });
  } else {
    db.insert(req.body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errormessage: "error getting data" });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  comment = req.body;
  comment.post_id = Number(id);

  if (!req.body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.insertComment(comment)
      .then((comment) => {
        res.status(201).json(comment);
      })
      .catch((error) => {
        console.log(error);
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  let post = req.body;

  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ message: "provide a title and contents for the post." });
  } else {
    db.update(id, post)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message:
              "The post with the specified ID does not exist, please try again.",
          });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "The post information could not be modified" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id).then((post) => {
    if (post) {
      res.status(200).json(`succesfully deleted post ${id}`);
    } else {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist." });
    }
  });
});

module.exports = router;
