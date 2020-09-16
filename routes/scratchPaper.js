// Can I simplify this code, for a post request?

// `POST` request to `/api/posts/:id/comments`:
router.post("/:id/comments", (req, res) => {
  // Q: In plain english what is occuring here?
  // 1) I declare a variable of "info" that is a copy of the current object, req.body (which is the existing comments) but I think I could just push that info... I will deal with this later for better Space Time Complexity
  // Big O notation of as of now is: O(M + N) becuase I have to copy the intier object, then input my new comment?

  // 2) Then I invoke the insertComment function within my database and pass it my info varibale
  const info = { ...req.body, post_id: req.params.id };
  db.insertComment(info)
    .then((commentId) => {
      // Q: What is commentId?
      // - The comment_id is the new comment id and its place in the Array
      console.log("I am commentId", commentId);
      db.findCommentById(commentId.id)
        // - Then down here I am checking if the comment did get added, by retriving it from the database by locating its object.id key then returning the actual comment back to the client via json message
        .then((comment) => {
          console.log("I am the comment", comment);
          res.status(201).json(comment);
        })
        .catch((err) => {
          console.log("There was an error finding the post ID", err);
        });
    })
    .catch((err) => {
      console.log("There was an error inserting the comment", err);
      db.findById(req.params.id)
        .then((post) => {
          if (!post[0]) {
            res.status(404).json({
              message: `Post with ${req.params.id} could not be found`,
            });
          } else if (!req.body.text) {
            res.status(400).json({
              message:
                "There was no text for the comment, please provide text for the comment",
            });
          } else {
            res.status(500).json({
              error: "There was an error saving the comment to the data base",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
});
