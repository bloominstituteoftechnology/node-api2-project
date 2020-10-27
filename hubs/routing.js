const express = require("express");
const router = express.Router();
let postDatabase = require("../data/db");
//[GET] requests
router.get("/", (req, res) => {
  postDatabase
    .find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});
router.get("/api/posts/:id", (req, res) => {
  postDatabase
    .findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});
router.get("/api/posts/:id/comments", (req, res) => {
  postDatabase
    .findCommentById(req.params.id)
    .then((data) => {
      if (!data.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    });
});
//[POST] requests
router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post",
    });
  } else {
    postDatabase
      .insert({ title: req.body.title, contents: req.body.contents })
      .then((data) => {
        res.status(201).json({
          title: req.body.title,
          contents: req.body.contents,
          id: data.id,
        });
      })
      .catch((err) => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database.",
        });
      });
  }
});
router.post("/api/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const info = req.body;
  if (!info.text) {
    res.status(404).json({
      message: "Please provide text for the comment.",
    });
  } else {
    postDatabase
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(400).json({
            message: "The post with the specified ID does not exist",
          });
        } else {
          postDatabase.insertComment({ ...info, post_id: id }).then((ban) => {
            res.status(201).json(ban);
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
      });
  }
});
//[PUT] request
router.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const info = req.body;
  if (!info.title || !info.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    postDatabase
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(400).json({
            message: "The post with the specified ID does not exist.",
          });
        } else {
          postDatabase.update(id, info).then((update) => {
            res.status(200).json(update);
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "The post information could not be modified",
        });
      });
  }
});
//[DELETE] request
router.delete("/api/posts/:id", (req, res) => {
  postDatabase
    .findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        postDatabase.remove(req.params.id).then((data) => {
          res.status(202).json({
            message: "Deletion successful",
            data,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The post could not be removed.",
      });
    });
});
module.exports = router;
