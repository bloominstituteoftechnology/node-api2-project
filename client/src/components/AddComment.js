import React, { Component } from "react";
import { Form, Field, withFormik } from "formik";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleModal}>
          <Modal.Header closeButton>Add Comment</Modal.Header>
          <Form>
            <Modal.Body>
              <Field
                component="textarea"
                name="comment"
                placeholder="type your commment"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Submit</Button>

              <Button onClick={this.props.handleModal}>Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

const withFormikAddCommentFrom = withFormik({
  mapPropsToValues({ comment }) {
    return {
      comment: comment || ""
    };
  },
  handleSubmit(values, { props, resetForm }) {
    console.log("values: ", values);
    console.log("props: ", props);

    axios
      .post(`http://localhost:4500/api/posts/${props.id}/comments`, {
        text: values.comment
      })
      .then(res => {
        console.log("sbumitted comment: ", props.handleModal);
        props.handleModal();
        resetForm();
      })
      .catch(err => console.log(err));
  }
})(AddComment);
export default withFormikAddCommentFrom;
