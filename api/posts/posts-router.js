// implement your posts router here
const express = require('express');
const db = require("./posts-model");


const router = express.Router();

router.get('/', (req,res) => {
  db.find()
  .then((response) => {
    res.send(response);
  })
  .err(() => {
    res.status(500).send({ message: "The posts information could not be retrieved" });
  })
})

module.exports = router;