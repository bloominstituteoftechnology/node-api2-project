const express = require("express");

const DB = require("./db.js");

const router = express.Router();

router.post("/", (req, res) => {
  DB.insert(req.body)
    .then(created => {
      res.status(201).json(created);
    })
    .catch(error => {
      res.status();
    });
});
