const knex = require('knex');
const config = require('../knexfile.js');
const { off } = require('../server.js');
const db = knex(config.development);

module.exports = {
    find,
    findById,
    insert, 
    remove,
    update,
    findPostComments,
    findCommentsById,
    insertComment,
};

function find(query) {
    const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc'} = query;
    const offset = limit * (page - 1);

    let rows = db('lambda')
        .orderBy(sortby, sortdir)
        .limit(limit)
        .offset(offset);
    
    return rows;
}

function findById(id){
    return db('lambda')
        .where({ id })
        .first();
}

async function insert(post) {
    const [id] = await db('posts').insert(hub);

    return findById(id);
}

function remove(id) {
    return db('posts')
        .where({id})
        .del();
}

function update(id, changes) {
    return db('posts')
        .where({ id })
        .update(changes, '*');
}

function findPostComments(postId) {
    return db('comments as c')
        .join('posts as p', 'c.post.id', 'p.id')
        .select('c.id', 'c.text', 'c.sender', 'h.id as postId', 'h.name as post')
        .where({ post_id: postId})
}

function findCommentsById(id) {
    return db('comments')
        .where({ id })
        .first();
}

async function insertComment(comment) {
    const [id] = await db('comments').insert(comment);

    return findCommentseById(id);
}