const express = require('express');
const server = express();
const router = express.Router();
const users = require('../data/db');
// Post request
server.post('/api/users', (req, res) => {
    const userData = req.body;
    if (!userData.name || !userData.bio) {
        res.status(400).json({errorMessage: 'Please give a BIO for the USER.'})
    } else {
        users.insert(userData)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({errorMessage: 'There was a problem while adding User to the database.'})
            })
    }
});
// GET Request.
server.get('/api/users', (req, res) => {
    users.find() //going to return a promise, hopefully that promise is kept!
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: 'Not able to get Users info.'})
        })
});
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    users.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({message: 'The user with that ID does not exist.'})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Not able to get Users info.", err})
        })
});
// Making a PUT request
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const update = req.body;
    if (!update.name || !update.bio) {
        res.status(400).json({errorMessage: 'I need a name for the BIO and USER.'})
    } else {
        users.update(id, update)
            .then(user => {
                if (!user) {
                    res.status(404).json({message: 'The user with that ID does not exist.'})
                } else {
                    res.status(200).json(user)
                }
            })
            .catch(err => {
                res.status(500).json({errorMessage: 'User info could not be modified.', err})
            })
    }
});
// DELETE Request
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    users.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({message: 'The user with that ID does not exist.'})
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Cannot remove the User.', err})
        })
});
module.exports = router;