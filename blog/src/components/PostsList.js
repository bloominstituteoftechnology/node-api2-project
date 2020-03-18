/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import {
  CardColumns,
  Card,
  CardTitle,
  CardText,
  CardBody,
  Button,
} from 'reactstrap';

import axios from 'axios';
import AddPost from './AddPost';

const PostsList = () => {
  const [postsList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts/')
      .then((response) => {
        setPostList(response.data);
      })
      .catch((err) => (err));
  }, [postsList]);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then((res) => (res))
      .catch((err) => (err));
  };

  return (
    <div>
      <AddPost postsList={postsList} setPostList={setPostList} />
        <div className="cards-wrapper">
        <CardColumns>
                    {postsList.map((post) => (
                            <Card key={post.id}>
                                <CardBody>
                                    <CardTitle>
                                        Title:
                                      {post.title}
                                    </CardTitle>
                                    <CardText>
                                        Contents:
                                        {post.contents}
                                    </CardText>
                                    <Button onClick={() => deletePost(post.id)}>Delete</Button>
                                </CardBody>
                            </Card>
                    ))}
        </CardColumns>
        </div>
    </div>
  );
};
export default PostsList;
