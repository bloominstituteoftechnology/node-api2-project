const db = require('../data/db')
const express = require('express')
const router =  express.Router()

//endpoint go here
// get all post

router.get('/', ( req, res ) => {
    db.find()
      .then( info => {
          res.status(200).json(info)
      })
      .catch( err => {
          res.status(500).json({ Erro:' err retrieving info '})
      })
})

router.get('/:id',( req, res ) => {
    const { id } = req.params
    db.findById(id)
      .then( info => {
          res.status(200).json(info)
      })
      .catch( err => {
        res.status(500).json({ Erro:' err retrieving info '})
    })
})

module.exports = router