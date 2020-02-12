/*jshint esversion: 6 */

const express = require("express");

const Hubs = require("./db.js");

const router = express.Router();

// middleware

// route handlers - handles what comes after /api/hubs
router.get("/", (req, res) => {
  const pagination = req.query;

  console.log("pagination", pagination);

  Hubs.find(pagination)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hubs"
      });
    });
});

//GET list of all posts
router.get("/api/posts", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved."
      });
    });
  res.status(200);
});

//GET a specific user

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Hubs.findById(id)
    .then(item => {
      if (!id) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(item);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved." });
    });
});

//GET comments for a specific post

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Hubs.findPostComments(id)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ errorMessage: "sorry, we failed you" });
    });
});

module.exports = router;
