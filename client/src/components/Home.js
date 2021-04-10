import axios from "axios";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";

const initialState = {
    title: "",
    contents: ""
}

const Home = () => {
    const [postList, setPostList] = useState([initialState])

    useEffect(() => {
        axios.get("http://localhost:4000/api/posts")
        .then(res => {
            setPostList(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [] )
  
    return(
        <div>
            <h1>Tweeter</h1>

            {postList.map(post => {
                return(
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.contents}</p>
                    </div>
                )
            })}

            <AddPost postList={postList} setPostList={setPostList}>
                <button>Add New Post</button>
            </AddPost>
        </div>
    )
}

export default Home