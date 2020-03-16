/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
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
                    {postsList.map((post) => (
                    <Container style={{ margin: '50px auto' }} className="card-wrapper">
                        <Row>
                            <Col xs="12" lg={{ size: 4, offset: 4 }}>
                                <Card key={post.id}>
                                    <CardTitle>
                                        Title:
                                      {post.title}
                                    </CardTitle>
                                    <CardText>
                                        Contents:
                                        {post.contents}
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    ))}
        </div>
    </div>
  );
};
export default PostsList;
