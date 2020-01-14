const knex = require('knex');
const knexConfig = require('../knexfile.js');
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
};
// GET posts /posts
function find() {
  return db('posts');
}
// GET posts by id /post/:id 
function findById(id) {
  return db('posts').where({ id: Number(id) });
}
// POST a post 
function insert(post) {
  return db('posts')
    .insert(post, 'id')
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}
// DELETE /posts/:id
function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}
// GET /posts/comments
function findPostComments(postId) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId);
}
// GET /posts/:id/comments
function findCommentById(id) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id);
}
// POST /posts/{payload}
function insertComment(comment) {
  return db('comments')
    .insert(comment)
    .then(ids => ({ id: ids[0] }));
}
