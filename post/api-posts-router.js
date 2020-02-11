const express = require("express");

const hubsRouter = require("../hubs/hubs-router");

const router = express.Router();

router.use("/posts", hubsRouter);

module.exports = router;
