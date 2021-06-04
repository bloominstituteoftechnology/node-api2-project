const Adopter = require('./adopters-model.js');
const express = require("express");

const router = express.Router();

//EXAMPLE
// router.get('/', (req, res) => {
//     Adopter.find(req.query)
//       .then(adopters => {
//         throw new Error("I died")
//         res.status(200).json(adopters);
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error retrieving the adopters',
//         });
//       });
//   });

module.exports = router;