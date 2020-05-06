import React from 'react';

const Post = ({ post }) => {
    return(
        <div>
            <h3>{post.id} - {post.title}</h3>
            <p>{post.contents}</p>
        </div>
    )
}

export default Post;