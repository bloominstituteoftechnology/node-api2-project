const router = require("express").Router();

const data = require("../data/db.js");

router.get("/", (req, res) => {
    res.status(200).send("hello from the GET /api/blog")
});

module.exports = router;