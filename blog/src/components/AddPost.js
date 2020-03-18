import React, { useState } from 'react';
import {
  Label,
  Row,
  Col,
  Form,
  Input,
  Button,
  FormGroup,
  Container,
} from 'reactstrap';

import axios from 'axios';

const AddPost = () => {
  const [newPost, setNewPost] = useState('');
  const handleChangesAdd = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/posts', newPost)
      .then((res) => (res))
      .catch((err) => (err));
  };
  return (
    <Container>
      <Row>
        <Col xs="12" md={{ size: 8, offset: 3 }}>
          <Form onSubmit={handleAdd}>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChangesAdd}
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="contents"
                placeholder="Content"
                onChange={handleChangesAdd}
              />
            </FormGroup>
            <Button style={{ display: 'flex', alignItems: 'center' }}>Add new Post</Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AddPost;
