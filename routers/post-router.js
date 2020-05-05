const express = require("express");

const Posts = require("../data/db.js"); // <fix the folder path></fix>

const router = express.Router(); // mind the UPPERCASE R by visual studio code


//Creates a post using the information sent inside the request body.
//#1 -Creates a post using the information sent inside the request body.
//@route /api/posts
router.post("/", (req, res) => {
    Posts.addData(req.body);
    //If the request body is missing the title or contents property:
    if (!addData.title || !addData.contents) {
        res
            .status(400)
            .json({
                errorMessage: "Please provide title and contents for the post."
            });
        //If the information about the post is valid:
    } else {
        Post.insert(addData)
            .then(postRes => {
                res.status(201).json(postRes);
            })
            //
            .catch(error => {
                // log error to database
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                });
            });
    }
});

//#2 -Creates a comment for the post
//-with the specified id using information sent inside of the request body.
//When the client makes a POST request to @route /api/posts/:id/comments:
router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
    const comments = {...req.body, post_id: id };
    if (!comments.text) {
        res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
    } else {
        Posts.findById(id)
            .then(post => {
                //If the post with the specified id is not found:
                if (!post) {
                    res
                        .status(404)
                        .json({ message: "The post with the specified ID does not exist." });
                    //If the information about the comment is valid:
                } else {
                    Posts.insertComment(comments)
                        .then(res => {
                            res.status(201).json(res);
                        })
                        .catch(error => {
                            console.log(error);
                            //If there's an error while saving the comment:
                            res.status(500).json({ error: "There was an error while saving the comment to the database" });
                        });
                }
            })

    }
});


//



// mind the S in exportS
module.exports = router; // same as below

// export default server; // ES2015 MODULES