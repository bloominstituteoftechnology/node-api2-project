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

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Hubs.findById(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      req.status(500).json({message: 'The post with the specified ID does not exist.'});
    });
});

module.exports = router;
