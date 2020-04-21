const express = require('express');
const server = express();
const PORT = 8000;


const postRoutes = require('./posts/postRoutes');


server.use(express.json());
// server.use('/', (req, res) => {
//   res.status(200).send('API up and running')
// });

//Routers
server.use('/posts', postRoutes);



server.listen(PORT, () => {
  console.log(`\n API running on PORT ${PORT}\n`)
});