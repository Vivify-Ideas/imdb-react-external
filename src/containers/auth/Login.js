import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { logIn, googleLogin } from '../../store/actions/AuthActions';
import config from '../../config';
import { showErrorModal } from '../../store/actions/ErrorActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = field => event => this.setState({ [field]: event.target.value });

  submit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { logIn } = this.props;
    const logInData = {
      email,
      password
    };
    logIn(logInData);
  };

  googleSuccessResponse = res => {
    const { accessToken, googleId } = res;
    const { googleLogin } = this.props;
    googleLogin({ accessToken, googleId });
  };

  googleErrorResponse = err => {
    showErrorModal(err);
  };

  render() {
    const { email, password } = this.state;
    const { loginError } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row h-100">
              <div className="col-md-3" />
              <div className="col-md-6 justify-content-center align-items-center">
                <div className="card mt-5">
                  <div className="card-body">
                    <h3 className="text-center mb-3">Log in:</h3>
                    <form id="c_form-h" onSubmit={this.submit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row d-flex justify-content-center align-items-center">
                            <div className="col-10 d-flex justify-content-center align-items-center">
                              <input
                                type="text"
                                className="form-control w-75"
                                placeholder="Enter email"
                                value={email}
                                onChange={this.handleInputChange('email')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row d-flex justify-content-center align-items-center">
                            <div className="col-10 d-flex justify-content-center align-items-center">
                              <input
                                type="password"
                                className="form-control w-75"
                                id="inputmailh"
                                placeholder="Enter password"
                                value={password}
                                onChange={this.handleInputChange('password')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-5 d-flex justify-content-end align-items-center">
                          <button type="submit" className="btn btn-success">
                            Log in
                          </button>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                          or:
                        </div>
                        <div className="col-md-5 d-flex justify-content-start align-items-center">
                          <GoogleLogin
                            clientId={config.GOOGLE_CLIENT_ID}
                            buttonText="Log in"
                            onSuccess={this.googleSuccessResponse}
                            onFailure={this.googleErrorResponse}
                            cookiePolicy="single_host_origin"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                          <Link to="/register">
                            <h5>Don&apos;t have an account?</h5>
                          </Link>
                        </div>
                      </div>
                      {loginError && (
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <h5 className="text-danger">Login error</h5>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.error.loginError
  };
};

const mapDispatchToProps = {
  logIn,
  showErrorModal,
  googleLogin
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
