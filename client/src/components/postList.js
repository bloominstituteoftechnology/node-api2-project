import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post'

const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/posts`)
            .then(res => {
                console.log(res.data)
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return(
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    );
}

export default PostList;