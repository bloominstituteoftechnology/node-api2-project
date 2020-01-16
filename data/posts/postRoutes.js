const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("hello");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json("hello from id");
});

router.post("/", (req, res) => {
  res.status(200).json("hello from post");
});

module.exports = router;
