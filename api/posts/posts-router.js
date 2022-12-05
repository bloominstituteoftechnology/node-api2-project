// implement your posts router here
const express = require(`express`)
const Posts = require(`./posts-model`)
const router = express.Router()

//GET Requests:
router.get(`/`, (req, res) => {
   Posts.find()
      .then(posts => {
         res.status(200).json(posts)
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: "The posts information could not be retrieved" })
      })
})

router.get(`/:id`, (req, res) => {
   const { id } = req.params

   Posts.findById(id)
      .then(post => {
         if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
         }
         else (res.status(200).json(post))

      })
      .catch(err => {
         console.log(err)
         res.status(500).json({ message: "The post information could not be retrieved" })
      })
})

router.get(`/:id/comments`, (req, res) => {
   Posts.findPostComments(req.params.id)
      .then(postComments => {
         if (postComments.length === 0) {
            return res.status(404).json({ message: "The post with the specified ID does not exist" })
         }
         res.status(200).json(postComments)
      })
      .catch(err => {
         console.log(`Error:`, err)

         res.status(500).json({ message: "The comments information could not be retrieved" })
      })
})

//POST Request:
router.post(`/`, (req, res) => {
   Posts.insert(req.body)
      .then(newPost => {
         res.status(201).json({ ...newPost, ...req.body })
      })
      .catch(err => {
         console.log(err)
         if (err.errno === 19) {
            return res.status(400).json({ message: "Please provide title and contents for the post" })
         }
         res.status(500).json({ message: "There was an error while saving the post to the database" })
      })
})

// PUT Request:
router.put(`/:id`, (req, res) => {
   const changes = req.body
   const { id } = req.params
   const num_id = parseInt(id)

   Posts.update(id, changes)
      .then(updatedPost => {
         if (updatedPost === 0) {
            return res.status(404).json({ message: "The post with the specified ID does not exist" })
         }
         else if (!changes.title || !changes.contents) {
            return res.status(400).json({ message: "Please provide title and contents for the post" })
         }
         res.status(200).json({ id: num_id, ...changes })
      })
      .catch(err => {
         console.log(err)

         if (err.message.includes(`.update()`)) {
            return res.status(400).json({ message: "Please provide title and contents for the post" })
         }

         res.status(500).json({ message: "The post information could not be modified" })
      })
})


//Delete Request:
router.delete(`/:id`, async (req, res) => {
   const post = await Posts.findById(req.params.id);

   Posts.remove(req.params.id)
      .then(deletePost => {
         if (deletePost > 0) {
            return res.status(200).json(post)
         }
         res.status(404).json({ message: "The post with the specified ID does not exist" })
      })
      .catch(err => {
         console.log(`Error:`, err)

         res.status(500).json({ message: "The post could not be removed" })
      })
})


module.exports = router
