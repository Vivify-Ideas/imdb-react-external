import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import getFormattedDate from '../util/dateUtils';
import { getSubComments, addSubComment } from '../store/actions/CommentActions';
import { CommentModal } from './CommentModal';

export class CommentReplies extends Component {
  state = {
    isOpen: false
  };

  componentDidUpdate(prevProps) {
    const { subComments } = this.props;
    if (prevProps.subComments !== subComments) {
      this.modalClose();
    }
  }

  modalShow = () => this.setState({ isOpen: true });

  modalClose = () => this.setState({ isOpen: false });

  createComment = text => {
    const { movieId, commentId, addSubComment } = this.props;
    addSubComment({
      movieId,
      commentId,
      text
    });
  };

  showSubComments = () => {
    const { getSubComments, movieId, commentId } = this.props;
    getSubComments({ movieId, commentId });
  };

  renderSubComments = () => {
    const { subComments } = this.props;
    if (subComments.length) {
      return subComments.map(subComment => {
        return (
          <p className="mx-1 my-1 px-1 py-1">
            {subComment.text} -<i>{subComment.user.name}</i> (
            {getFormattedDate(subComment.createdAt)})
          </p>
        );
      });
    }
    return <p className="mx-1 my-1 px-1 py-1">No replies yet!</p>;
  };

  render() {
    const { eventKey } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <Card className="border-left-0 border-right-0 border-left-0">
          <Card.Header>
            <div className="row mt-1">
              <div className="col-md-6">
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={eventKey}
                  className="text-dark"
                  onClick={this.showSubComments}
                >
                  Show replies
                </Accordion.Toggle>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <button type="button" className="btn btn-info" onClick={this.modalShow}>
                  Reply
                </button>
              </div>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={eventKey}>
            <Fragment>{this.renderSubComments()}</Fragment>
          </Accordion.Collapse>
        </Card>
        <CommentModal createComment={this.createComment} show={isOpen} onHide={this.modalClose} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    subComments: state.comment.subComments
  };
};

const mapDispatchToProps = {
  getSubComments,
  addSubComment
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentReplies)
);
