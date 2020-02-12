const express = require("express");

const postsRouter = require("./blogRouter.js");

const router = express.Router();

// this router handles requests beginning in /api

router.use("/posts", postsRouter);

// handle /api /server


module.exports = router;