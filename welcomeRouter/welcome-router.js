const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome, this is the /root sections" });
});

module.exports = router;
