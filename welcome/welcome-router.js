const express = require("express")

const router = express.Router()

router.get('/', (req, res) => {
  res.send(`The '/' API'`);
});

router.get('/api', (req, res) => {
  res.send(`The '/api' API'`);
});

module.exports = router