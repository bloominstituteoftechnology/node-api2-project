const express = require("express");
const DB = require("../data/db");

const router = express.Router();

// testing working

router.get("/", (req, res) => {
  DB.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving posts",
      });
    });
});
router.get("/:id", (req, res) => {
  DB.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  DB.findPostComments(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
});

router.post("/", (req, res) => {
  req.body.title && req.body.contents
    ? DB.insert(req.body)
        .then(() => {
          res.status(201).json(req.body);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            messge: "There was an error while saving the post to the database",
          });
        })
    : res.status(400).json({
        errorMessage: "Please provide title and contents for the post.",
      });
});

router.post("/:id/comments", (req, res) => {
  DB.findById(req.params.id)

    .then((post) => {
      if (post) {
        req.body.text
          ? DB.insertComment(req.body)
              .then(res.status(200).json(req.body))
              .catch((err) => {
                console.log(err);
              })
          : res
              .status(400)
              .json({ errorMessage: "Please provide text for the comment." });
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
});

router.delete("/:id", (req, res) => {
  DB.findById(req.params.id)
    .then((post) => {
      if (post) {
        DB.remove(req.params.id)
          .then(() => res.status(200).json(post))
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "The post could not be removed" });
          });
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
});

router.put("/:id", (req, res) => {
  !req.params.id
    ? res.status(404).json({ errorMessage: "ID not found" })
    : req.body.title && req.body.contents
    ? DB.update(req.params.id, req.body)
        .then(res.status(200).json(req.body))
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Error processing request" });
        })
    : res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post.",
        });
});

module.exports = router;