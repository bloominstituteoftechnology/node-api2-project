// Import Express
// const express = require('express');

const app = require('./server.js');

//Import Short Id for Setting ID to each record
// const shortid = require('shortid');

//Setting Server and ports

// Date --------------------------
// let ts = Date.now();

// let newDate = new Date(ts);
// let day = newDate.getDate();
// let month = newDate.getMonth() + 1;
// let year = newDate.getFullYear();
// let hour = newDate.getHours();
// let minute = newDate.getMinutes();
// let second = newDate.getSeconds();

// const monthNames = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December'
// ];

// const days = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday'
// ];

// const today = new Date();

// const formatDate =
//   days[today.getDay()] +
//   ' ' +
//   monthNames[today.getMonth()] +
//   ' ' +
//   day +
//   ' ' +
//   year +
//   ' ' +
//   hour +
//   ':' +
//   minute +
//   ':' +
//   second;
// Date End -------------------------------------

//Declaring and Array of Users
// let posts = [
//   {
//     id: shortid.generate(),
//     text: `That's Greath Idea`,
//     created_at: formatDate,
//     updated_at: formatDate
//   },
//   {
//     id: shortid.generate(),
//     text: `That's Greath Idea`,
//     created_at: formatDate,
//     updated_at: formatDate
//   }
// ];

//Is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// server.use(express.json());

// server.get('/', (req, res) => {
//   res.send(`Server is Running 🏃on Port ${PORT}`);
// });
// server.get('/api/posts', (req, res) => {
//   if (posts.length > 0) {
//     res.status(200).json(posts);
//   } else {
//     res.status(404).send({ message: 'No data to Display.' });
//   }
// });

// server.get('/api/posts/:id', (req, res) => {
//   const { id } = req.params;

//   const found = posts.find(post => post.id === id);

//   if (found) {
//     res.status(200).json(found);
//   } else {
//     res
//       .status(404)
//       .json({ message: `The post with the ${id} ID does not exist.` });
//   }
// });

// server.post('/api/users', (req, res) => {
//   const newUser = req.body;
//   //   console.log(req.body);

//   if ('name' in newUser && 'bio' in newUser) {
//     newUser.id = shortid.generate();

//     users.push(newUser);
//     res.status(201).json(newUser);
//   } else {
//     res
//       .status(400)
//       .send({ errorMessage: 'Please provide name and bio for the user.' });
//   }
// });

// server.delete('/api/users/:id', (req, res) => {
//   const { id } = req.params;

//   const found = users.find(user => user.id === id);

//   if (found) {
//     users = users.filter(user => user.id !== found.id);

//     res.status(200).json({ deleted: found });
//   } else {
//     res
//       .status(404)
//       .json({ message: 'The user with the specified ID does not exist.' });
//   }
// });

// server.patch('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   if ('name' in changes && 'bio' in changes) {
//     const found = users.find(user => user.id === id);

//     if (found) {
//       Object.assign(found, changes);

//       res.status(200).json(found);
//     } else {
//       res
//         .status(404)
//         .json({ message: 'The user with the specified ID does not exist.' });
//     }
//   } else {
//     res
//       .status(400)
//       .json({ errorMessage: 'Please provide name and bio for the user.' });
//   }
// });

// server.put('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const updatedUser = req.body;

//   if ('name' in updatedUser && 'bio' in updatedUser) {
//     const foundIndex = users.findIndex(user => user.id === id);

//     if (foundIndex !== -1) {
//       users[foundIndex] = { ...updatedUser, id };
//       res.status(200).json(users[foundIndex]);
//     } else {
//       res
//         .status(404)
//         .json({ message: 'The user with the specified ID does not exist.' });
//     }
//   } else {
//     res
//       .status(400)
//       .json({ errorMessage: 'Please provide name and bio for the user.' });
//   }
// });

// const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
