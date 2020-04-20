const express = require('express');
const router = express.Router();


// POST @ /api/posts
router.post('/', (req,res) =>{
  res.status(200).send(`hello from the POST /posts endpoint.`)
  //?
});

router.post('/:id/comments', (req, res) =>{
  const { id } = req.params;
  //?
});


//GET @ /api/posts
router.get('/', (req, res) => {
  res.status(200).send('hello from the GET posts endpoint.')
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).send(`hello from the GET /posts/${id} posts endpoint.`);
});

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  //?
});


// DELETE @ /api/posts/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  //
})


//PUT @ /api/posts/:id
router.put('/', (req, res) => {
  const { id } = req.params;
})


module.exports = router;