import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeErrorModal } from '../store/actions/ErrorActions';

class ErrorModal extends Component {
  generateErrorMessage = message => (message.response ? message.response.data : message.message);

  generateStatusMessage = status => (status ? ` (${status})` : '');

  hideErrorModal = () => {
    const { closeErrorModal } = this.props;
    closeErrorModal();
  };

  render() {
    const { shouldShow, message } = this.props;
    const errorMessage = this.generateErrorMessage(message);
    return (
      <Modal size="sm" show={shouldShow} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'red' }}>
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h3>{errorMessage}</h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={this.hideErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    shouldShow: state.error.showErrorModal,
    message: state.error.errorModalMessage
  };
};

const mapDispatchToProps = {
  closeErrorModal
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorModal)
);
