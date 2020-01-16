import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from 'react-fullscreen-loading';
import debounce from '../util/debounce';

export class CustomLoading extends Component {
  state = {
    shouldLoad: false
  };

  componentDidMount() {
    this.delayedLoadingEnder = debounce(() => {
      this.setState({ shouldLoad: false });
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    const { requestCount } = this.props;
    if (prevProps.requestCount !== requestCount) {
      requestCount > 0 ? this.setState({ shouldLoad: true }) : this.delayedLoadingEnder();
    }
  }

  componentWillUnmount() {
    this.delayedLoadingEnder.cancel();
  }

  render() {
    const { shouldLoad } = this.state;
    return <Loading loading={shouldLoad} background="rgba(255,255,255,0.2)" loaderColor="black" />;
  }
}

const mapStateToProps = state => {
  return {
    requestCount: state.loading.requestCount
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(CustomLoading)
);
