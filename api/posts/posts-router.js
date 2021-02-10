const Post = require("./posts-model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await Post.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
        });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Post.findById(id);
        res.status(200).json(user);
    } catch (e) {
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        });
    }
});

router.post("/", async (req, res) => {
    const post = req.body;
    if (post.title || post.contents) {
        try {
            const newUserId = await Post.insert(post);
            res.status(201).json({ ...post, newUserId });
        } catch (e) {
            res.status(500).json({
                message:
                    "There was an error while saving the post to the database",
            });
        }
    } else {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    const update = req.body;
    if (post) {
        if (update.title || update.contents) {
            const postUpdated = await Post.update(id, update);
            postUpdated
                ? res.status(200).json({ ...update, id })
                : res.status(500).json({
                      message: "The post information could not be modified",
                  });
        } else {
            res.status(400).json({
                message: "Please provide title and contents for the post",
            });
        }
    } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        });
    }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) {
        const postDeleted = await Post.delete(id);
        postDeleted
            ? res.status(200).json(id)
            : res
                  .status(500)
                  .json({ message: "The post could not be removed" });
    } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        });
    }
});

router.get("/:id/comments", async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) {
        try {
            const comments = await Post.findCommentById(id);
            res.status(200).json(comments);
        } catch (e) {
            res.status(500).json({
                message: "The comments information could not be retrieved",
            });
        }
    } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        });
    }
});

module.exports = router;
