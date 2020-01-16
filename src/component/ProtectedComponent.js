import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { getMe, isAuthenticated } from '../store/actions/AuthActions';

export class ProtectedComponent extends Component {
  state = {
    finishedLoading: false
  };

  componentWillMount() {
    const { isAuthenticated, getMe, isLoggedIn } = this.props;
    isAuthenticated();
    if (isLoggedIn) {
      getMe();
    }
  }

  componentDidUpdate(prevProps) {
    const { requestCount } = this.props;
    if (prevProps.requestCount !== requestCount) {
      if (requestCount === 0) {
        this.setState({ finishedLoading: true });
      }
    }
  }

  isAllowed = () => {
    const { loggedInUser, authorizedRoles } = this.props;
    if (loggedInUser.roles) {
      const userRoles = loggedInUser.roles.map(tokenRole => tokenRole.name);
      return authorizedRoles.some(allowedRole => userRoles.includes(allowedRole));
    }
  };

  render() {
    const { finishedLoading } = this.state;
    const { isLoggedIn, loggedInUser, path, component } = this.props;
    if (finishedLoading) {
      if (!isLoggedIn) {
        return <Redirect to="/login" />;
      }
      if (isEmpty(loggedInUser)) {
        return null;
      }
      if (this.isAllowed()) {
        return <Route exact path={path} component={component} />;
      }
      return <Redirect to="/unauthorized" />;
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.authUser.loggedInUser,
    isLoggedIn: state.authUser.isLoggedIn,
    requestCount: state.loading.requestCount
  };
};

const mapDispatchToProps = {
  getMe,
  isAuthenticated
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProtectedComponent)
);
