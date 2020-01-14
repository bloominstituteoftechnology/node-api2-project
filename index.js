const express = require('express') 
const app = express()
const PORT = 5001;
const hostname = '127.0.0.1';

const  { 
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,} = require ('./data/db');


app.use(express.json());

app.get('/', (req, res) => {
    find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'error finding the post'
        });
    });
});



app.get('/api/posts/:id/comments', (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    findPostComments(id)
    .then(res => {
        console.log('get comment res',res)
    })
    .catch(error => {
        console.log('get comment error',error)
    })

})

app.post(`/api/posts`, (req, res) => {

    const {title, contents} = req.body;
    console.log(req.body);

    if(!title || !contents) {
        res 
            .status(400)
            .json("Please provide title and contents for the post.")
    } else {
        insert(req.body)
            .then( post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json("There was an error while saving the post to the database", error)
            })
    }

    app.post("/api/posts/:id/comments", (req, res)=> {
        const data = req.body;
        console.log(req.body)

        if(!data.text) {
            res.status(400).json( 'please provide text for the post')
        } else {
            insertComment(data)

            .then(comment => {
                if (comment) {
                    res.status(201).json(comment)
                } else {
                    res.status(404).json( 'the specific id does not exist')
                }
            })

            .catch(error => {
                console.log(error);
                    res.status(500).json({errormessage: 
                        'Error while saving the comment to the database'})
            })
        }
    })
})










app.listen(PORT, hostname, () => {
    console.log(`App running http://${hostname}:${PORT}`);
  })