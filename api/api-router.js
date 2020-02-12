// EXPRESS ROUTER --- makes other code dry

const express = require('express');

const hubsRouter = require('../hubs/hubs-router.js');

const router = express.Router();

// this router handles requests beginning in /api
// handle /api  /posts
router.use("/posts", hubsRouter);

module.exports = router;