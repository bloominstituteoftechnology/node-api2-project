/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import {
  CardColumns,
  Card,
  CardTitle,
  CardText,
  CardBody,
} from 'reactstrap';
import axios from 'axios';

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

  return (
    <div>
        <div className="cards-wrapper">
        <CardColumns>
                    {postsList.map((post) => (
                            <Card>
                                <CardBody key={post.id}>
                                    <CardTitle>
                                        Title:
                                      {post.title}
                                    </CardTitle>
                                    <CardText>
                                        Contents:
                                        {post.contents}
                                    </CardText>
                                </CardBody>
                            </Card>
                    ))}
        </CardColumns>
        </div>
    </div>
  );
};
export default PostsList;
