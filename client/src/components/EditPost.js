import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

const EditPost = ({ postList, setPostList }) => {
    const [post, setPost] = useState({
        title: "", 
        contents: ""
    })

    const { push } = useHistory()
    
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:4000/api/posts/${id}`)
            .then(res => {
                setPost(res.data)
            })
            .catch(err => console.log(err))
    }, [id] )

    const handleChange = (e) => {
        e.persist();

        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:4000/api/posts/${id}`, post)
            .then(res => {
                push('/posts');
            })
            .catch(err => console.log(err));
    }
    
    const deletePost = e => {
        e.preventDefault();

        axios.delete(`http://localhost:4000/api/posts/${id}`)
            .then(res => {
                setPostList(postList.filter(item => {
                    return item.id !== post.id
                }))
                push('/posts');
            })
            .catch(err => console.log(err));
    };

    return(
        <div>
            <h2>Edit Post</h2>

            <form>
                <textarea
                    type='text'
                    name='title'
                    value={post.title}
                    onChange={handleChange}
                />

                <textarea
                    type='text'
                    name='contents'
                    value={post.contents}
                    onChange={handleChange}
                />
          
                <button onClick={handleSubmit}>Update</button>

                <button onClick={deletePost}>Delete</button>
            </form>
        </div>
       
    )
}

export default EditPost
