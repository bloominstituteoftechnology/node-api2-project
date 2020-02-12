const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
  .then((postResult) => {
    res.status(200).json(postResult)
  })
  .catch((err) => {
    res.status(201).json({ message: 'My bad!'})
  })
})

router.post('/', (req, res) => {
  const body = req.body
  if(!body.title || !body.contents) {
    res.status(400).json({ message: 'Post must include a title and contents' })
  } else {
    db.insert(req.body)
    .then((res) => {
      res.status(201)
      db.findById(result.id)
      .then((post) => {
        res.json(post)
      })
    })
    .catch ((err) => {
      res.status(500).json({ message: 'An error occurred saving your post.'})
    })
  }
})

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
  .then((post) => {
    res.status(200).json(post)
  })
  .catch((err) => {
    res.status(404).json({ message: 'Requested page does not exist' })
  })
})

router.delete('/:id'), (req, res) => {
  db.findById(req.params.id)
  .then((post) => {
    db.remove(post[0].id)
    .then((res) => {
      res.status(204).json(res)
    })
    .catch((err) => {
      res.status({ message: "The post with that specific ID does not exist." })
    })
  })

  router.put('/:id', (req, res)  => {
    db.find(req.params.id)
    if(!req.params.id) {
      res.status(400).json({ message: 'No post matching that ID found.' })      
    } else if(!req.body.title || !req.body.contents) {
      return res.status(400).json({ message: 'Post requires Title and Contents' })
    } else {
      db.update(req.params.id, req.body)
      .then((res) => {
        db.findById(req.params.id)
        .then((post) => {
          res.status(200).json(post)
        })
      })
      .catch((err) => {
        res.status(500).json({ message: 'There was an error updating post' })
      })
    }
  })
}

module.exports = router;