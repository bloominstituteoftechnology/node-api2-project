const express = require('express');
const router = express.Router();

const db = require('../../db');

router.get('/', (req, res) => {
  const id = req.params.id;
  res.status(200).json(db[id]);
})

module.exports = router;