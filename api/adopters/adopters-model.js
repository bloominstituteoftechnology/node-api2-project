// const knex = require('knex');
// const config = require('../../knexfile.js');
// const db = require('../../data/db-config');

//EXAMPLE
// module.exports = {
//     find,
//     findById,
//     add,
//     remove,
//     update,
//     findDogs,
//   };

//   function find(query) {
//     const { page = 1, limit = 3, sortby = 'id', sortdir = 'asc' } = query;
//     const offset = limit * (page - 1);
  
//     const rows = db('adopters')
//       .orderBy(sortby, sortdir)
//       .limit(limit)
//       .offset(offset);
  
//     return rows;
//   }