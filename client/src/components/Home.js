import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = ({postList, setPostList}) => {
   
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
            <h1>Tweeter</h1>
            
            {postList.map((post) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.contents}</p>
                </div>
            ))}

            <button onClick={() => push("/addPost")}>Add New Post</button>
        </div>
    )
}

export default Home