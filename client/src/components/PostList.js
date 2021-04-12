import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PostCard from "./PostCard"

const PostList = ({ postList, setPostList }) => {
   
    const { push } = useHistory()

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
        <div>
            <h1>Seven Stones</h1>

            {postList.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
            
            <button onClick={() => push("/addPost")}>Add New Post</button>
        </div>
    )
}

export default PostList