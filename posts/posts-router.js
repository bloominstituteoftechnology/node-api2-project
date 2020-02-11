const express = require('express');

const Hubs = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'The posts information could not be retrieved.'});
    });
});

module.exports = router;
