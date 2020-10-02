const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: "Home page for Posts Api!",
  })
})

module.exports = router;