const express = require("express");

const Posts = require("../db");

const router = express.Router();

// Endpoint Specifications
// TODO When the client makes a GET request to /api/posts:

// If there's an error in retrieving the posts from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      // todo how do you cancel the request?
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

// TODO When the client makes a GET request to /api/posts/:id:

// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If there's an error in retrieving the post from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be retrieved." }.

// compare the id you get from params to the ids in the database
// filter through the posts in the database and if the req.params.id body does not match, return 404. if it does, return post

router.get("/:id", (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;

  Posts.findById(req.params.id).then(post => {
    // console.log(post[0].title);
    if (!post[0]) {
      res.status(404).json({
        message: "The post with the specific ID does not exist."
      });
    } else if (post) {
      res.status(200).json(post);
    } else {
      res.status(500).json({
        message: "The post information could not be retrieved."
      });
    }
  });
});

// TODO When the client makes a GET request to /api/posts/:id/comments:

// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If there's an error in retrieving the comments from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The comments information could not be retrieved." }.

router.get("/:id/comments", (req, res) => {
  // const { postId } = req.params;

  console.log(req.params);

  Posts.findPostComments(req.params.id).then(comments => {
    if (!comments[0]) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else if (comments) {
      console.log(comments);
      res.status(200).json(comments);
    } else
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
  });
});

// TODO When the client makes a POST request to /api/posts:

// If the request body is missing the title or contents property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If the information about the post is valid:
// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.

// If there's an error while saving the post:
// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    });
});

// TODO When the client makes a POST request to /api/posts/:id/comments:

// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If the request body is missing the text property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide text for the comment." }.

// If the information about the comment is valid:
// save the new comment the the database.
// return HTTP status code 201 (Created).
// return the newly created comment.

// If there's an error while saving the comment:
// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the comment to the database" }.

router.post("/:id/comments", (req, res) => {
  console.log(req.body);
  console.log(req.body.text);
  console.log(req.params);
  console.log(req.params.id);
  const { text } = req.body;
  const post_id = Number(req.params.id);
  if (!req.params.id) {
    // console.log(req.params.id);
    res.status(404).json({
      errorMessage: "The post with the specified ID does not exist."
    });
  }
  if (!req.body.text) {
    // console.log(text);
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  }
  Posts.insertComment({ post_id, text })
    .then(comments => {
      // console.log(post_id);
      res.status(201).json(comments);
    })
    .catch(err => {
      console.log("error", err);
      console.log({ post_id, text });
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    });
});

// router.post("/:id/comments", (req, res) => {
//   const { text } = req.body;
//   // const { id } = req.params
//   const post_id = req.params.id;
//   Posts.findById(req.params.id).then(post => {
//     if (post[0]) {
//       Posts.insertComment({ text, post_id })
//         .then(data => {
//           console.log(data.id);
//           res.status(201).json(data);
//         })
//         .catch(error => {
//           console.log(error);
//           res.status(500).json({
//             errorMessage:
//               "Error 500: This is a server side error. If this error persists contact your server admin. "
//           });
//         });
//       //
//     } else {
//       if (!req.body.text) {
//         res
//           .status(400)
//           .json({ errorMessage: "Please provide contents for the post." });
//       } else {
//         res.status(404).json("The post with the specified ID does not exist.");
//       }
//     }
//   });
// });

// TODO When the client makes a DELETE request to /api/posts/:id:

// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If there's an error in removing the post from the database:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post could not be removed" }.

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({
      message: " The post with the specified ID does not exist."
    });
  }
  Posts.remove(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "The post could not be removed."
      });
    });
});

// TODO When the client makes a PUT request to /api/posts/:id:

// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.

// If the request body is missing the title or contents property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If there's an error when updating the post:
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.

// If the post is found and the new information is valid:
// update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.

router.put("/:id", (req, res) => {
  console.log(req.body);
  const { title, contents } = req.body;
  const id = req.params.id;

  if (!id[0]) {
    res.status(404).json({
      message: "The postwith the specified ID does not exist."
    });
  }
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  Posts.update(req.params.id, req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
});

// TODO Stretch Problems
// To work on the stretch problems you'll need to enable the cors middleware. Follow these steps:

// add the cors npm module: npm i cors.
// add server.use(cors()) after server.use(express.json()).
// Create a new React application and connect it to your server:

// Use create-react-app to create an application inside the root folder, name it client.
// From the React application connect to the /api/posts endpoint in the API and show the list of posts.
// Style the list of posts however you see fit.
module.exports = router;
