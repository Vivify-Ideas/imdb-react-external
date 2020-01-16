import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import Comment from './Comment';
import { CommentModal } from './CommentModal';
import { getComments, addComment } from '../store/actions/CommentActions';
import Pagination from './Pagination';

export class Comments extends Component {
  constructor(props) {
    const { currentLimit, currentOffset } = props;
    super();
    this.state = {
      isOpen: false,
      limit: currentLimit,
      offset: currentOffset
    };
  }

  componentDidMount() {
    const { getComments, movieId } = this.props;
    getComments({ movieId, ...this.state });
  }

  componentDidUpdate(prevProps) {
    const { comments } = this.props;
    if (prevProps.comments !== comments) {
      this.modalClose();
    }
  }

  modalShow = () => this.setState({ isOpen: true });

  modalClose = () => this.setState({ isOpen: false });

  createComment = commentText => {
    const { addComment, movieId } = this.props;
    addComment({ movieId, text: commentText });
  };

  renderComments = () => {
    const { comments } = this.props;
    return comments.map((comment, idx) => <Comment key={comment._id} counter={idx} comment={comment} />);
  };

  render() {
    const { isOpen } = this.state;
    const { getComments } = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row mt-1">
                  <div className="col-md-6 d-flex justify-content-start align-items-center">
                    <h5 className="card-title">
                      <b>Comments:</b>
                    </h5>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <button type="button" onClick={this.modalShow} className="btn btn-info">
                      <i className="fa fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                  <CommentModal
                    createComment={this.createComment}
                    show={isOpen}
                    onHide={this.modalClose}
                  />
                </div>
                <hr />
                <Accordion className="border-0">{this.renderComments()}</Accordion>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1 text-center">
          <div className="col-md-12 justify-content-end align-items-center">
            <Pagination action={getComments} params={{ ...this.state, ...this.props }} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comment.comments,
    currentOffset: state.pagination.offset,
    currentLimit: state.pagination.limit
  };
};

const mapDispatchToProps = {
  getComments,
  addComment
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comments)
);
