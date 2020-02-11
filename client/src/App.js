import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit } = useForm();
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, [trigger]);

  const editPost = post => {
    console.log(post);
    axios
      .put(`http://localhost:5000/api/posts/${post.id}`, post)
      .then(res => {
        console.log(res);
        setEditing(false);
        setTrigger(trigger + 1);
      })
      .catch(err => console.log(err));
  };

  const deletePost = post => {
    axios
      .delete(`http://localhost:5000/api/posts/${post.id}`)
      .then(res => {
        console.log(res);
        setTrigger(trigger + 1);
      })
      .catch(err => console.log(err));
  };
  
  const addPost = post => {
    axios.post(`http://localhost:5000/api/posts`, post)
    .then(res => {
      console.log(res)
      setTrigger(trigger + 1)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      {posts.map(post => {
        return editing ? (
          <form onSubmit={handleSubmit(editPost)}>
            <label htmlFor="title">
              Title:{" "}
              <input
                placeholder={post.title}
                type="text"
                name="title"
                ref={register({ required: true })}
              />
            </label>
            <label htmlFor="contents">
              Post:{" "}
              <input
                placeholder={post.contents}
                type="text"
                name="contents"
                ref={register({ required: true })}
              />
            </label>
            <label>
              <p>Id:</p>
              <input
                type="text"
                value={post.id}
                name="id"
                ref={register({ required: true })}
              />
            </label>
            <input type="submit" />
            <button
              onClick={() => {
                setEditing(false);
              }}
            >
              cancel
            </button>
          </form>
        ) : (
          <div>
            <h1>{post.title}</h1>
            <p>{post.contents}</p>
            <button
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deletePost(post);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <form onSubmit={handleSubmit(addPost)}>
        <label htmlFor="title">
          Title:{" "}
          <input type="text" name="title" ref={register({ required: true })} />
        </label>
        <label htmlFor="contents">
          Post:{" "}
          <input
            type="text"
            name="contents"
            ref={register({ required: true })}
          />
        </label>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default App;
