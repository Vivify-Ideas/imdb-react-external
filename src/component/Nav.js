import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMe, logout } from '../store/actions/AuthActions';
import { ADMIN } from '../security/securityConstants';

export class Nav extends Component {
  componentDidMount() {
    const { getMe, isLoggedIn } = this.props;
    if (isLoggedIn) {
      getMe();
    }
  }

  logout = () => {
    const { logout } = this.props;
    logout();
  };

  renderRoles = () => {
    const { loggedInUser } = this.props;
    if (loggedInUser.roles) {
      return loggedInUser.roles.map(role => role.name);
    }
  };

  renderProtectedUIComponent = (role, template) => {
    const { loggedInUser } = this.props;
    if (!loggedInUser.roles) {
      return null;
    }
    const usersRoles = loggedInUser.roles.map(role => role.name);
    if (usersRoles.includes(role)) {
      return template;
    }
    return null;
  };

  render() {
    const { isLoggedIn, loggedInUser } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container">
          <button
            className="navbar-toggler navbar-toggler-right border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbar12"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbar12">
            <Link className="navbar-brand d-none d-md-block" to="/home">
              <i className="fa d-inline fa-film fa-2x" />
            </Link>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"> </li>
              <li className="nav-item">
                {this.renderProtectedUIComponent(
                  ADMIN,
                  <Link className="nav-link" to="/create-movie">
                    Create movie
                  </Link>
                )}
              </li>
              <li className="nav-item"> </li>
            </ul>
            <ul className="navbar-nav">
              {isLoggedIn ? (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      <Fragment>
                        {loggedInUser.email}({this.renderRoles()})
                      </Fragment>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-light ml-1" onClick={this.logout}>
                      Logout
                    </button>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Log in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authUser.isLoggedIn,
    loggedInUser: state.authUser.loggedInUser
  };
};

const mapDispatchToProps = {
  getMe,
  logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
);
