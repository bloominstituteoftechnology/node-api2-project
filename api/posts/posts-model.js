const knex = require('knex');
const config = require('../../knexfile.js');
const db = knex(config.development);

module.exports = {
   findById,
   posts
};

// function findById(id) {
//     return db('posts')
//       .where({ id })
//       .first();
//   }



function findById(id) {
    return db('posts').where({ title: String(id) });
  }

  async function posts(a){

        const [id] = await db('posts').insert(a);
        return findById(id);
      

}