const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log('get all posts find error', error);
            res.status(500).json({message: 'There was an error in getting all the posts.'});
        });
});

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db.findById(postId)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: `No post with id: ${postId} found.`});
            }
        })
        .catch(error => {
            console.log('get findbyid error', error);
            res.status(500).json({message: 'There was an error getting data from the database.'});
        });
});

router.post('/', (req, res) => {
    const newPost = req.body;
    if (newPost.title && newPost.contents) {
        db.insert(newPost)
            .then(newPostId => {
                if (newPostId) {
                    res.status(201).json({newPost: {...newPost, id: newPostId.id}});
                } else {
                    res.status(500).json({message: 'For some reason the database did not give back an id for the new post.'});
                }

            })
            .catch(error => {
                console.log('error for insert', error);
                res.status(500).json({message: 'Was unable to add a new post.'});
            });
    }
});

router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const editedPost = req.body;
    let existingPost = {};
    db.findById(postId)
        .then(post => {
            existingPost = post;
        });
    db.update(postId, editedPost)
        .then(count => {
            if (count) {
                res.status(200).json({preExistingPost: existingPost, fieldsChanged: editedPost});
            } else {
                res.status(500).json({message: 'there was an error updating the post'});
            }
        })
        .catch(error => {
            console.log('put update error', error);
            res.status(500).json({message: 'sorry there was an error trying to do that, update'});
        });
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    let existingPost = {};
    db.findById(postId)
        .then(post => {
            existingPost = post;
        });
    db.remove(postId)
        .then(count => {
            if (count) {
                res.status(200).json({
                    message: `The post with ID of: ${postId} was removed`,
                    removedPost: existingPost
                });
            } else {
                res.status(500).json({message: 'There was an error removing that post.'});
            }
        })
        .catch(error => {
            console.log('delete remove error', error);
            res.status(500).json({message: 'Not able to remove that post.'});
        });
});

router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    db.findPostComments(postId)
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => {
            console.log('get all comments by postId error', error);
            res.status(500).json({message: 'Could not get any comments from the database.'});
        });
});
router.get('/:id/comment', (req, res) => {
    const commentId = req.params.id;
    db.findCommentById(commentId)
        .then(comment => {
            res.status(200).json(comment);
        })
        .catch(error => {
            console.log('get comment by id error', error);
            res.status(500).json({message: 'Could not get any comments from the database.'});
        });
});

router.post('/:id/comments', (req, res) => {
    const postId = req.params.id;
    const newComment = req.body;
    if (postId === newComment.post_id) {
        db.insertComment(newComment)
            .then(id => {
                res.status(201).json({id: id.id, ...newComment})
            })
            .catch(error => {
                console.log('add comment error', error);
                res.status(500).json({message: 'Something went wrong when trying to add comment to database.'})
            })
    } else {
        res.status(400).json({message: 'Please be sure you are adding to the correct post. Your url id and body id do not match.'})
    }

});

module.exports = router;