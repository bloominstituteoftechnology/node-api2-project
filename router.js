const express = require('express');

const router = express.Router();

router.use(express.json());

const db = require('./data/db');






module.exports = router;