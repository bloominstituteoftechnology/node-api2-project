const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
  db.find(req.body)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

// MALANI GRACE TULLOCH

// router.post("/", (req, res) => {

//   if (!req.body.title || !req.body.contents) {
//     return res.status(400).json({
//       errorMessage: "Please provide title and contents for the post.",
//     });
//   } else if (req.body.title || req.body.contents) {
//     db.insert(req.body)
//       .then((post) => {
//         res.status(201).json(post);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     res.status(500).json({
//       error: "There was an error while saving the post to the database",
//     });
//   }
// });

module.exports = router;
