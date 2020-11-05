const dataBase = require("../data/db");

/// LOOKS FOR findById MIDDLEWARE /api/posts/:id
function checkUserID() {
  return (req, res, next) => {
    dataBase
      .findById(req.params.id)
      .then((postById) => {
        if (postById) {
          //attach post byId to the request
          //so we can access it in later middleware functions
          req.postById = postById;
          //add NEXT() ---> this will stop and send to the route handler get BY ID
          next();
        } else {
          res.status(404).json({ message: "Cant find user by post ID" });
        }
      })
      .catch((error) => {
        console.log(error, "error in get BY ID catch");
        res
          .status(500)
          .json({ error: "can't retrieve the post, error on server" });
      });
  };
}

function checkPostData() {
  return (req, res, next) => {
    if (!req.body.title && !req.body.contents) {
      return res.status(400).json({ message: "missing title and contents" });
    }
    next();
  };
}

module.exports = {
  checkUserID,
  checkPostData,
};
