const express = require("express")

const server = express()

const Hubs = require ("./data/db.js")

server.use(express.json())

server.get('/', (req, res) =>{
    res.status(200).json({message: "Hello World"})
})

server.get('/', (req, res) =>{
    res.json({message: 'Hello World'})
})
server.get('/api/users', (req, res) => {
   try {
        res.json(users)
   } 
   catch(err){
       res.status(500).json({ errorMessage: "The users information could not be retrieved." })
   }
})

server.get('/api/users/:id', (req, res) => {
   try{ res.json(users)
   }
   catch(err){
    { message: "The user with the specified ID does not exist." }
   }
})

server.post('/api/users', (req, res) =>{
    
    // const emptyString = " ";
try {
    const UsersInfo = req.body;
    if (UsersInfo.name && UsersInfo.bio){
        users.id = shortid.generate()
        users.push(UsersInfo);
        res.status(201).json(UsersInfo)
    } else {
        res.status(400).json({message: 'Please provide a Name and a Bio'})
     }
    }
catch(err){
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
       
    })
    
server.put('/api/users/:id', (req, res) => {
 const {id} = req.params;
 const changes = req.body;
 changes.id = id;
 try {
 let index = users.findIndex(user => user.id ===id);

 if (index !==-1){
     users[index] = changes;
     res.status(200).json(users[index])
 }else{
     res.status(400).json({message: "User Not Found"})
 }
}
catch (err){
    { message: "The user with the specified ID does not exist." }
}
})

server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;
    const deleted = hubs.find(hub => hub.id === id);
    try {
    if (deleted) {
        hubs = hubs.filter(hub => hub.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: "id not found"});
    }
}
    catch(err){
        { message: "The user with the specified ID does not exist." }
    }
});

module.exports = server;