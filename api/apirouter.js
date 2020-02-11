const express = require("express");

const postsRouter = require("../posts/postsRouter.js");

const router = express.Router();

router.use("/posts", postsRouter);

module.exports = router;
