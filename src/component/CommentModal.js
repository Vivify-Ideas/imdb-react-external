import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export class CommentModal extends Component {
  state = { commentText: '' };

  handleInputChange = field => event => {
    const fieldValue = event.target.value;
    this.setState({ [field]: fieldValue });
  };

  render() {
    const { createComment, onHide, ...modalProps } = this.props;
    const { commentText } = this.state;
    return (
      <Modal {...modalProps} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add a new comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control as="textarea" rows="3" onChange={this.handleInputChange('commentText')} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => createComment(commentText)}>
            Add
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CommentModal;
