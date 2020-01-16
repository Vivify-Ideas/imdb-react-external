import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import updatePaginationState from '../store/actions/PaginationActions';

export class Pagination extends Component {
  componentDidUpdate(prevProps) {
    const { currentOffset, action, params, currentLimit } = this.props;
    if (prevProps.currentOffset !== currentOffset) {
      action({
        ...params,
        limit: currentLimit,
        offset: currentOffset
      });
    }
  }

  hasLeft = () => {
    const { currentOffset, currentLimit, currentCount } = this.props;
    if (currentOffset + currentLimit < currentCount) {
      return true;
    }
    return false;
  };

  nextPage = () => {
    const { updatePaginationState, currentLimit, currentOffset } = this.props;
    updatePaginationState({
      offset: currentOffset + currentLimit
    });
  };

  previousPage = () => {
    const { currentOffset, currentLimit, updatePaginationState } = this.props;
    if (currentOffset >= currentLimit) {
      updatePaginationState({
        offset: currentOffset - currentLimit
      });
    }
  };

  render() {
    const styleLi = !this.hasLeft()
      ? { color: 'darkgrey', cursor: 'pointer' }
      : { cursor: 'pointer' };
    const styleAnchor = !this.hasLeft() ? { pointerEvents: 'none' } : {};
    return (
      <ul className="pagination d-flex justify-content-center align-items-center">
        <li className="page-item" style={{ cursor: 'pointer' }}>
          <button type="button" className="page-link" onClick={this.previousPage}>
            <span className="text-dark">«</span>
          </button>
        </li>
        <li className="page-item" style={styleLi}>
          <button type="button" style={styleAnchor} className="page-link" onClick={this.nextPage}>
            <span className="text-dark">»</span>
          </button>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentLimit: state.pagination.limit,
    currentOffset: state.pagination.offset,
    currentCount: state.pagination.count
  };
};

const mapDispatchToProps = {
  updatePaginationState
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Pagination)
);
