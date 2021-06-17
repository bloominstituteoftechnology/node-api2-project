const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
  getComments,
};

//GET
function find() {
  return db("posts");
}
//GET BY ID //api/posts/:id
function findById(id) {
  return db("posts").where({ id: Number(id) });
}

//POST
function insert(post) {
  return db("posts")
    .insert(post, "id")
    .then((ids) => {
      return db("posts").where({ id: ids }).first();
    });
}

//PUT
function update(id, post) {
  return db("posts")
    .update(post)
    .where({ id })
    .then((ids) => {
      return db("posts").where({ id: id }).first();
    });
}

//DELETE
function remove(id) {
  return db("posts").where("id", Number(id)).del();
}

//GET  /api/posts/:id/comments
function findPostComments(postId) {
  return db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("post_id", postId);
}

//GET /api/posts/:id/comments/:id
function findCommentById(id) {
  return db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("comments.id", id);
}

//POST  NEW COMMENT /api/posts/:id/comments
function insertComment(comment) {
  return db("comments")
    .insert(comment)
    .then((ids) => {
      return db("comments").where({ id: ids }).first();
    });
}

//GET /api/comments
function getComments() {
  return db("comments");
}
