const knex = require('knex');
const configure = require('../knewfile.js');
const { off } = require('../server.js');
const db = knex(config.development);

module.exports = {
    find,
    findById,
    add, 
    remove,
    update,
    findPostMessages,
    findMessageById,
    addMessage,
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

async function add(post) {
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

function findPostMessages(postId) {
    return db('messages as m')
        .join('posts as p', 'm.post.id', 'p.id')
        .select('m.id', 'm.text', 'm.sender', 'h.id as postId', 'h.name as post')
        .where({ post_id: postId})
}

function findMessageById(id) {
    return db('messages')
        .where({ id })
        .first();
}

async function addMessage(message) {
    const [id] = await db('messages').insert(message);

    return findMessageById(id);
}