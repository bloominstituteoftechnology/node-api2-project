const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('hello from the GET posts endpoint.')
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).send(`hello from the GET /posts/${id} posts endpoint.`);
});

router.post('/', (req, res) => {
  res.status(200).send(`hello from the POST /posts endpoint.`);
});

module.exports = router;