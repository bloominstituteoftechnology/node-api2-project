const router = require('express').Router();


const postRoutes = require('./postRoutes');

router.use('/posts', postRoutes)



module.exports = router;