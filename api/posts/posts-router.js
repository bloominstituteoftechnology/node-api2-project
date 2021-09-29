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

router.put("/:id", async (req, res) => {
  const change = req.body;
  const { id } = req.params;
  const post = await Post.findById(id);
  try {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else if (!change.title || !change.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      await Post.update(id, change);

      res.status(200).json({
        id: parseInt(id),
        title: change.title,
        contents: change.contents,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});

// router.put("/:id", (req, res) => {
//   const changes = req.body;
//   const { id } = req.params;
//   Post.update(id, changes)
//     .then((post) => {
//       if (!post) {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist" });
//       } else if (!changes.title || !changes.contents) {
//         res
//           .status(400)
//           .json({ message: "Please provide title and contents for the post" });
//       } else {
//         console.log(changes);
//         res.status(201).json({
//           id: parseInt(id),
//           title: changes.title,
//           contents: changes.contents,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500);
//       console.log(err);
//     });
// });

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

router.delete("/:id", async (req, res) => {
  const deletedPost = await Post.findById(req.params.id);
  if (!deletedPost) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  } else {
    Post.remove(req.params.id)
      .then(() => {
        res.status(200).json(deletedPost);
      })
      .catch(() => {
        res.status(500).json({ message: "the post could not be removed" });
      });
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  } else {
    try {
      const comments = await Post.findPostComments(id);
      console.log(comments);
      res.status(200).json(comments);
    } catch (err) {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    }
  }
});

module.exports = router;
