import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import axios from "axios";

function UpdatePost(props) {
  const [myPost, setMyPost] = useState({});

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`http://localhost:4500/api/posts/${id}`)
      .then(res => {
        res.data.map(post => setMyPost(post));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Update Post</h1>
      <Form className="postForm">
        <Field type="text" name="title" />
        <Field type="textarea" className="contentArea" name="contents" />
        <button>Submit</button>
      </Form>
    </div>
  );
}

const FormikUpdatePostForm = withFormik({
  mapPropsToValues({ title, contents }) {
    return {
      title: title || "",
      contents: contents || ""
    };
  },
  handleSubmit(values) {
    console.log("edit post: ", values);
  }
})(UpdatePost);
export default FormikUpdatePostForm;
