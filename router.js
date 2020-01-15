const express = require("express");

const DB = require("./data/db");

const router = express.Router();

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    DB.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({
          error: "There was an error while saving the post to the database 💩"
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  if (!id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else if (!text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  } else {
    DB.insertComment(req.body)
      .then(comment => {
        res.status(201).json(comment);
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({
          error: "There was an error while saving the comment to the database."
        });
      });
  }
});

router.get("/", (req, res) => {
  DB.find(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  DB.findById(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(201).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  DB.findPostComments(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(201).json(post);
      } else {
        res.status(404).json({
          message:
            "The post with the specified ID does not exist or no comments have been posted."
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  DB.remove(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(201).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: "The post could not be removed."
      });
    });
});

router.put("/:id/", (req, res) => {
  DB.update(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

module.exports = router;
