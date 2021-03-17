
/*

const Posts = require('./posts-model.js');




module.exports = {
//GET
    getPosts:async function (req, res) {
        try {
            const posts = await Posts.find(req.query);
            res.status(200).json(posts)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'error retrieving posts'
            });

    }
}



*/