const express = require("express")
const Posts = require('./posts-model')
const router = express.Router();

//  #### 1 [GET] /api/posts
router.get("/", (req, res) => {
	Posts.find(req.query)
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "The posts information could not be retrieved"
			})
		})
})

// #### 2 [GET] /api/posts/:id
router.get("/:id", (req, res) => {
	Posts.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res
					.status(404)
					.json({ 
                        message: "The post with the specified ID does not exist" 
                    });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "The post information could not be retrieved",
			});
		});
});

// #### 3 [POST] /api/posts

router.post("/", (req, res) => {
	const { title, contents } = req.body
    if(!title || !contents){
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else {
            Posts.insert({ title, contents })
				.then(({id}) => {
				return Posts.findById(id)
				})
                    .then(posts => {
                        res.status(201).json(posts)
                    } )
					.catch((error) => {
					console.log(error);
								res.status(500).json({
									message:
										"There was an error while saving the post to the database",
                                    error: error.message,
                                    stack: error.stack,

								})
							})
           
        }
    })
  

// #### 4 [PUT] /api/posts/:id
router.put("/:id", (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		res.status(400).json({
			message: "Please provide title and contents for the post",
		})
	} else {
		Posts.findById(req.params.id)
			.then((stuff) => {
				if (!stuff) {
					res.status(404).json({
						message: "The post with the specified ID does not exist",
					});
				} else {
					return Posts.update(req.params.id, req.body);
				}
			})
			.then((data) => {
				if (data) {
					return Posts.findById(req.params.id);
				}
			})
			.then((posts) => {
				if (posts) {
					res.json(posts)
				}
			})

			.catch((error) => {
				console.log(error)
				res.status(500).json({
					message: "The post information could not be modified",
					error: error.message,
					stack: error.stack,
				})
			})
	}
})

//#### 5 [DELETE] /api/posts/:id
router.delete("/:id", async (req, res) => {
	try {
		const posts = await Posts.findById(req.params.id);
		if (!posts) {
			res.status(404).json({
				message: "The post with the specified ID does not exist",
			});
		} else {
			await Posts.remove(req.params.id);
			res.json(posts);
		}
	} catch (error) {
		res.status(500).json({
			message: "The post could not be removed",
			error: error.message,
			stack: error.stack,
		})
	}
})
//#### 6 [GET] /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
	try {
		const post = await Posts.findCommentById(req.params.id);

		if (!post) {
			res.status(404).json({
				message: "The post with the specified ID does not exist",
			});
		} else {
            const comments = await Posts.findPostComments(req.params.id)
            res.json(comments)
        }    
       
	} catch (error) {
		res.status(500).json({
			message: "The comments information could not be retrieved",
			error: error.message,
			stack: error.stack,
		})
	}
})



module.exports = router;