import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormSetter {
  title: string;
  contents: string;
}

export const Form: React.FC = (): any => {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data) => {
    axios.post("http://localhost:4001/api/posts", data).then((res) => {
      console.log(res);
      reset();
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input name="title" ref={register({ required: true })}></input>
      <label>Contents</label>
      <input name="contents" ref={register({ required: true })}></input>
      <button type="submit">Submit</button>
    </form>
  );
};
