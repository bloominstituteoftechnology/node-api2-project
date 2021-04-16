import axios from "axios";
import { useEffect } from "react";
import Post from "./Post"
import Header from "./Header"

const PostList = ({ postList, setPostList }) => {
    useEffect(() => {
        axios.get("http://localhost:4000/api/posts")
        .then(res => {
            setPostList(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [setPostList] )
  
    return(
        <>
        <Header />

        <div className="post-list-container">
                {postList.map(post => (
                    <Post key={post.id} post={post} />
                ))}
        </div>
        </>
    )
}

export default PostList