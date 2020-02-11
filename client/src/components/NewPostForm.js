import { useForm } from "react-hook-form";
import React from "react";

function NewPostForm(props) {
     const { register, handleSubmit } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(props.addPost)}>
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
        <input type="submit" />
      </form>
    </div>
  );
}

export default NewPostForm;
