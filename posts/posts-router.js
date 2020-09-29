const express = require("express");

const DataBase = require("../data/db"); // USE LATER

const router = express.Router();

router.get("/", (req, res) => {
  DataBase.find(req)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  DataBase.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(500)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  DataBase.findPostComments(req.params.id)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Dailed to get comments from the server" });
    });
});

router.post("/", (req, res) => {
  DataBase.insert(req.body)
    .then((post) => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  DataBase.insertComment(req.body)
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment);
      } else if (!comment) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

router.delete("/:id", (req, res) => {
  DataBase.remove(req.params.id)
    //   posts = posts.filter((u) => u.id !== id);
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  DataBase.update(req.params.id, changes)
    .then((updated) => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          errorMessage: "The post can not be found!"
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
