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

router.post('/',(req, res) => {
    const { title , contents } = req.body
      !title || !contents?
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." }):
          db.insert(req.body)
            .then( post => {
                res.status(201).json(req.body)
            })
            .catch( err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })

})

router.post('/:id/comments',(req, res) => {
    const { text } = req.body
	const post_id = req.params.id
	!text
		? res.status(400).json({ errorMessage: 'Please provide text for the comment.' })
		: db.findById(post_id).then(post => {
				if (post_id !== post.id) {
					res.status(404).json({ message: 'The post with the specified ID does not exist.' })
				} else {
					let newComment = {
						text,
						post_id,
					}
					db
						.insertComment(newComment)
						.then(({ id }) => {
							db.findCommentById(id).then(comment => {
								res.status(201).json(comment)
							})
						})
						.catch(err => {
							res.status(500).json({
								message: 'There was an error while saving the comment to the database',
							})
						})
				}
		  })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    
	db.findById(id)
		.then(post => {
			post
                ? db.remove(id)
                      .then(post => {
							res.status(200).json({ message: 'Post was deleted'}) 
				  })
				: res.status(404).json({ message: `The Post with specified ${id} Does NOT Exist` })
		})
		.catch(err => {
			res.status(500).json({ message: 'The Post Could Not Be Removed' })
		})
})

router.put('/:id', (req, res) => {
	const { title, contents } = req.body
	const id = req.params.id

	!title || !contents
		? res.status(400).json({ errorMessage: 'No Title and No Contents for this Post' })
		: db.update(id, req.body)
				.then(post => {
                    post ? res.status(200).json(req.body) 
                        :res.status(404).json({ message: 'The post with the specified ID does not exist.' })
				})
				.catch(err => {
					res.status(500).json({
						message: 'The post information could not be modified.',
					})
				})
})


module.exports = router