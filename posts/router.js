const express = require("express"); // imports express
const Posts = require('../data/db.js'); // path to data
const router = express.Router(); // import Router with express

// These will handle any request that begins with /api/posts:

//	Returns an array of all the post objects contained in the database:
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then((posts) => {
        res.status(200).json({ queryString: req.query, posts });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error retrieving posts."})
    })
})


module.exports = router;