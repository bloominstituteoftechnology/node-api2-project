const express = require("express");

const Posts = require("../data/db.js"); // <fix the folder path></fix>

const router = express.Router(); // mind the UPPERCASE R by visual studio code


//Creates a post using the information sent inside the request body.
//#1 -Creates a post using the information sent inside the request body.
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






// mind the S in exportS
module.exports = router; // same as below

// export default server; // ES2015 MODULES