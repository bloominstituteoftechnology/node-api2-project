const router = require("express").Router();

const DB = require('../data/db')

router.get('/', (req, res) => {

    const query = req.query

    DB.findPostComments(query)
    .then(db => {
        console.log(res)
        res.status(200).json({ data: db, parameters: req.query})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
    });
})

module.exports = router;