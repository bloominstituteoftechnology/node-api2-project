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

// POST to /api/posts
//how come it does not work if I .post to /api/posts?
router.post("/", (req, res) => {
  // axios.post(url, data, options); the data will be in body of the request
  const hubInfo = req.body;
  // validate the data, and if the data is valid save it
  if (!hubInfo.title || !hubInfo.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
    return null;
  }
  Hubs.insert(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

//POST to comments
//if doesnt work
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;

  const comment = { ...req.body, post_id: id };

  Hubs.insertComment(comment)
    .then(inserted => {
      res.status(201).json(inserted);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ errorMessage: "sorry, we failed you" });
    });
});

//PUT
//add if statement for title and contents
router.put("/:id", (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the hub"
      });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res.status(404).json({
          message: "The post with the specified ID could not be found"
        });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error the post could not be removed"
      });
    });
});

module.exports = router;
