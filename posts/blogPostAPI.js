const express = require("express");
const db = require("../data/db");

const router = express.Router();

//*********************************************************************** */
// POST Request api/posts/✅
router.post("/", (req, res) => {
  console.log(req.body.title);
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  db.insert(req.body)
    .then((response) => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

//*********************************************************************** */

// POST Request api/post/:id/comments
router.post("/:id/comments", (req, res) => {
  const postId = req.params.id;
  const postBody = req.body.text;
  console.log(postBody);

  db.findCommentById(postId)
    .then((response) => {
      console.log(response);
      if (response.length === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else if (!postBody) {
        res.status(400).json({
          errorMessage: "Please provide text for the comment.",
        });
      } else {
        db.insertComment({...req.body, post_id:postId})
          .then((response) => {
            res.status(200).json(response);
          })
          .catch((err) => {
            console.log(err.message)
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database",
            });
          });
      }
    })
    .catch(() => {
        res.status(500).then({
          error: "There was an error while saving the comment to the database",
        });
      });

});

//*********************************************************************** */

//GET Reuest api/post✅
router.get("/", (req, res) => {
  db.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//*********************************************************************** */

//GET Request api/post/:id✅
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then((response) => {
      if (response.length === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      res.status(500).then({
        error: "The post information could not be retrieved.",
      });
    });
});

//***********************************************************************
//GET Request api/post/:id'/comments✅
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  db.findCommentById(id)
    .then((response) => {
      if (response.length === 0) {
        then(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

//***********************************************************************
// DELETE Request api/post/:id✅
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then((response) => {
      if (response === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "User Deleted" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "The post could not be removed",
      });
    });
});
//***********************************************************************

// PUT Request api/post/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const postBody = req.body;
  db.update(id, postBody)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else if (!postBody.title || !postBody.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res.status(200).json(postBody);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The post information could not be modified.",
      });
    });
});

module.exports = router;
