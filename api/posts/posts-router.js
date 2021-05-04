// implement your posts router here

const Posts = require("./posts-model");

const router = require("express").Router();

// GET posts /api/posts
router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});
// GET post by id  /api/posts/:id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

// POST post /api/posts
router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      console.log(post);
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

// PUT post by id /api/posts/:id
router.put("/:id", (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be modified",
      });
    });
});
// DELETE post by id /api/posts/:id
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post could not be removed",
      });
    });
});

// GET post comments by id /api/posts/:id/comments

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((comments) => {
      console.log(comments);
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    });
});

module.exports = router;
