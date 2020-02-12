const express = require("express");

const hubsRouter = require("../data/express-router.js");

const router = express.Router();

// this router handles requests beginning in /api

// handle /api /hubs
router.use("/hubs", hubsRouter);
// router.use("/accounts", accountsRouter);

module.exports = router;
