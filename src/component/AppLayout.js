import React, { Fragment } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Home from '../containers/Home';
import { isAuthenticated, getWatchList } from '../store/actions/AuthActions';
import ProtectedComponent from './ProtectedComponent';
import Movie from './Movie';
import CreateMovie from './CreateMovie';
import CustomLoading from './CustomLoading';
import Unauthorized from './Unauthorized';
import { REGULAR, ADMIN } from '../security/securityConstants';
import ErrorModal from './ErrorModal';

class AppLayout extends React.Component {
  componentWillMount() {
    const { isAuthenticated, history, getWatchList, isLoggedIn } = this.props;
    isAuthenticated();
    history.listen(() => {
      if (isLoggedIn) {
        getWatchList();
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn, location, history } = this.props;
    if (isLoggedIn !== prevProps.isLoggedIn) {
      if (isLoggedIn) {
        history.push(location.pathname);
      } else {
        history.push('/login');
      }
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Fragment>
        <ErrorModal />
        {isLoggedIn ? <Nav /> : null}
        <CustomLoading />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <ProtectedComponent
            isLoggedIn={isLoggedIn}
            exact
            path="/home"
            component={Home}
            authorizedRoles={[ADMIN, REGULAR]}
          />
          <ProtectedComponent
            isLoggedIn={isLoggedIn}
            exact
            path="/movies/:id"
            component={Movie}
            authorizedRoles={[ADMIN, REGULAR]}
          />
          <ProtectedComponent
            isLoggedIn={isLoggedIn}
            exact
            path="/create-movie"
            component={CreateMovie}
            authorizedRoles={[ADMIN]}
          />
          {isLoggedIn ? null : <Route exact path="/register" component={Register} />}
          {isLoggedIn ? null : <Route exact path="/login" component={Login} />}
          <Route exapt path="/unauthorized" component={Unauthorized} />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authUser.isLoggedIn
  };
};

const mapDispatchToProps = {
  isAuthenticated,
  getWatchList
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppLayout)
);
