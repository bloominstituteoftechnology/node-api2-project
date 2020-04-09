import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/posts")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //   interface DataType {
  //     title: string;
  //     contents: string;
  //     id: number;
  //   }

  //   interface CommentType {
  //     text: string;
  //     post_id: number;
  //   }

  const handleComments = (id) => {
    setId(id);
    axios
      .get(`http://localhost:4001/api/posts/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {data.map((elem) => {
        return (
          <div
            style={{
              boxShadow: "3px 3px 3px 5px black",
              margin: "2% auto",
              width: "50%",
            }}
            key={uuidv4()}
          >
            <p>{elem.title}</p>
            <p>{elem.contents}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleComments(elem.id);
              }}
            >
              See Comments
            </button>
            {comments.length > 0 &&
              comments[0].id == elem.id &&
              comments.map((elem) => {
                return <div key={uuidv4()}>{elem.text}</div>;
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
