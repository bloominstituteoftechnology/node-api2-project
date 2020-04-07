const express = require("express");
const router = express.Router();
const db = require("../data/db");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const allPosts = await db.find();
      res.status(200).json(allPosts);
    } catch (err) {
      res.status(400).json(err);
    }
  })
  .post((req, res) => {
    !req.body.title || !req.body.contents
      ? res.status(400).json("post must include title and contents")
      : db
          .insert(req.body)
          .then((post) => {
            db.findById(post.id).then((updated) =>
              res.status(201).json(updated)
            );
          })
          .catch((err) => res.status(500).json("server error"));
  });

router
  .route("/:id")
  .get((req, res) => {
    db.findById(req.params.id)
      .then((post) => {
        post.length
          ? res.status(200).json(post)
          : res.status(404).json({ error: "id not found" });
      })
      .catch((err) => res.status(500).json({ error: err }));
  })
  .put((req, res) => {
    db.update(req.params.id, req.body).then((post) =>
      post == 1
        ? db.findById(req.params.id).then((post) => res.status(201).json(post))
        : res.status(404).json({ error: "user id not found" })
    );
  })
  .delete((req, res) => {
    db.remove(req.params.id)
      .then((deleted) =>
        deleted > 0
          ? res
              .status(201)
              .json(
                `successfully deleted ${deleted} items. ${req.params.id} deleted`
              )
          : res.status(404).json({
              error: `unable to deleted item with id ${req.params.id}, user not found`,
            })
      )
      .catch((err) =>
        res.status(500).json({ error: "internal error please try later" })
      );
  });

router
  .route("/:id/comments")
  .get(async (req, res) => {
    if ((await db.findById(req.params.id)).length) {
      db.findPostComments(req.params.id)
        .then((comments) => {
          comments.length
            ? res.status(200).json(comments)
            : res.status(404).json({ error: "no comments found" });
        })
        .catch((err) => res.status(500).json(err));
    } else {
      res.status(404).json("cannot find user with that id");
    }
  })
  .post((req, res) => {
    !req.body.text || !req.body.post_id
      ? res.status(400).json({
          error: "must include text and a post_id for associated comment",
        })
      : db
          .insertComment(req.body)
          .then(() => {
            db.findPostComments(req.params.id)
              .then((addedComment) => res.status(201).json(addedComment))
              .catch((err) => res.status(500).json(err));
          })
          .catch((err) => res.status(500).json(err));
  });

module.exports = router;
