const express = require("express");
const server = express.Router();
const db = require("../data/db.js");

server.use(express.json());

server.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: "The posts information could not be retrieved." });
    });
});

server.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    db.findById(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  }
});

server.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    db.findCommentById(id)
      .then(com => {
        res.status(200).json(com);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." });
      });
  }
});

server.post("/", (req, res) => {
  const body = req.body;
  if (!body.contents || !body.title) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

server.post("/:id/comments", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.insertComment(body)
      .then(re => {
        res.status(201).json(re);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});

server.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    db.remove(id)
      .then(re => {
        res.status(201).json(re);
      })
      .catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
      });
  }
});

server.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!body.title || !body.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  } else {
    db.update(id, body)
      .then(re => {
        res.status(200).json(re);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  }
});

module.exports = server;
