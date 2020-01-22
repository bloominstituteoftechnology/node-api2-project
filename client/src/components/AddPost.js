import React from "react";
import axios from "axios";

import { Form, Field, withFormik } from "formik";

function AddPost() {
  return (
    <div>
      <h1>Add Post</h1>
      <Form className="postForm">
        <Field type="text" name="title" placeholder="Post Title" />
        <Field
          type="textarea"
          className="contentArea"
          name="contents"
          placeholder="Post contents"
        />
        <button>Submit</button>
      </Form>
    </div>
  );
}

const FromikAddPost = withFormik({
  mapPropsToValues({ title, contents }) {
    return {
      title: title || "",
      contents: contents || ""
    };
  },
  //========validation=====================
  //========end of validation==============
  handleSubmit(values, { props }) {
    axios
      .post("http://localhost:4500/api/posts/", values)
      .then(res => {
        props.history.push("/");
      })
      .catch(err => console.log(err));
  }
})(AddPost);
export default FromikAddPost;
