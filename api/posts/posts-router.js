// implement your posts router here
const express = require("express");
const Post = require("./posts-model");
const router = express.Router();

//get post-----------
router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "cant retreive posts bruh, try again",
      });
    });
});
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    console.log("success");
    Post.insert({ title, contents })
      .then((id) => {
        res.status(201).json({
          id: id,
          title: title,
          contents: contents,
        });
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

router.put("/:id", (req, res) => {
  Post.update(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "cant retreive posts bruh, try again",
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "the post with the specified id does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message:
          "there's error with retreiving your post buddy, try another way",
      });
    });
});

module.exports = router;
