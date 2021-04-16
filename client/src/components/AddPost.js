import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom"

const AddPost = () => {
    const initialState = {
        title: "",
        contents: ""
    }
    
    const [newPost, setNewPost] = useState(initialState)

    const { push } = useHistory()

    const handleChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }
    
    const submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/api/posts", newPost)
            .then(() => {
                push("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <form>
            <h2>Add New Post</h2>

            <label htmlFor="title">Title:</label>
            <input
                name="title"
                onChange={handleChange}
                value={newPost.title}
            />

            <label htmlFor="contents">Contents:</label>
            <input
                name="contents"
                onChange={handleChange}
                value={newPost.contents}
            />

            <button onClick={submit}>Submit</button>
        </form>
    )
}

export default AddPost