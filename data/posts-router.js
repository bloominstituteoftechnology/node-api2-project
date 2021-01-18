const express = require('express')
const router = express.Router()
const Posts = require('./db.js')

/*
| POST   | /api/posts | Creates a post using the 
nformation sent inside the `request body`.       

When the client makes a `POST` request to `/api/posts`:

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If the information about the _post_ is valid:

  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

- If there's an error while saving the _post_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.

*/

router.post('/api/posts', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        if(req.body.title | req.body.contents === undefined){
            res.status(400).json({ error: "Please provide title and contents for the post. 400 /api/posts" });
            return
        }else{
            res.status(201).json(post)
            return post
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: `There was an error while saving the post to the database no POST/ here 500 ${err}`
        })
    })
})

/*
| POST   | /api/posts/:id/comments | Creates a comment for 
the post with the specified id using information sent inside of the `request body`.      

When the client makes a `POST` request to `/api/posts/:id/comments`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If the request body is missing the `text` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

- If the information about the _comment_ is valid:

  - save the new _comment_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _comment_.

- If there's an error while saving the _comment_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.
*/

router.post('/api/posts/:id/comments', (req, res) => {
    const commentInfo = { ...req.body, post_id: req.params.id }
    Posts.insertComment(commentInfo)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch(err => {
        res.status(500).json({
            message: `Error While POST /:id/comments 500 ${err}`,
            err
        })
    })
})

/*
GET    | /api/posts | Returns an array of all the 
post objects contained in the database.    

*/
router.get('/api/posts', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: `Wont retrieve GET/ 500 ${err}`
        })
    })
})

/*
GET    | /api/posts/:id  | Returns the post object 
with the specified

*/
router.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `GET/:id 404 ${err}`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message:`GET/:id 500 ${err}`
        })
    })
})
/*
GET | /api/posts/:id/comments | Returns an array of all the comment objects associated 
with the post with the specified id. 
*/
router.get('/api/posts/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `GET/:id/comments 404  ${req.params.id}`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `GET/:id/comments 500 ${err}`
        })
    })
})

/*
PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the 
`request body`. Returns the modified document
*/
router.put('/api/posts/:id', (req, res) => {
    const changes = req.body
    Posts.update(req.params.id, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post)
            } else {
            res.status(404).json({
                message: `PUT/:id 404 ${req.body}`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `PUT /:id 500 ${err}`
        })
    })
})

/*
DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the
database in order to satisfy this requirement. 
*/
router.delete('/api/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(id => {
        if (id > 0) {
            res.status(200).json({
                message: `DELETE/:id 200 ${'id '+id+' ',req.body }`
            })
            } else {
            res.status(404).json({
                message: `DELETE/:id 404 ${'id '+id+' ',req.body }`
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `DELETE/:id 500 ${'err '+err,req.body }`
        })
    })
})

module.exports = router