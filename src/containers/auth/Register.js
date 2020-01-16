import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ValidatorForm } from 'react-form-validator-core';
import ValidatedInput from '../../component/ValidatedInput';
import { register } from '../../store/actions/AuthActions';

class Register extends Component {
  state = {
    email: '',
    password: '',
    repeatedPassword: '',
    name: ''
  };

  componentWillMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      const { password } = this.state;
      if (value !== password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  submit = event => {
    event.preventDefault();
    const { email, password, name } = this.state;
    const { register } = this.props;
    const registerData = {
      email,
      password,
      name
    };
    register(registerData);
  };

  handleInputChange = field => event => this.setState({ [field]: event.target.value });

  render() {
    const { email, password, repeatedPassword, name } = this.state;
    const { registerError } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row h-100">
              <div className="col-md-3" />
              <div className="col-md-6 justify-content-center align-items-center">
                <div className="card mt-5">
                  <div className="card-body">
                    <h3 className="text-center mb-3">Register</h3>
                    <ValidatorForm id="c_form-h" onSubmit={this.submit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row d-flex justify-content-center align-items-center">
                            <div className="col-10 ">
                              <ValidatedInput
                                type="text"
                                className="form-control w-100"
                                placeholder="Email"
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                onChange={this.handleInputChange('email')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row d-flex justify-content-center align-items-center">
                            <div className="col-10 ">
                              <ValidatedInput
                                type="password"
                                className="form-control w-100"
                                placeholder="Password"
                                validators={['required', 'minStringLength:6']}
                                errorMessages={[
                                  'this field is required',
                                  'Password must be at least 6 characters long'
                                ]}
                                value={password}
                                onChange={this.handleInputChange('password')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row d-flex justify-content-center align-items-center">
                            <div className="col-10 ">
                              <ValidatedInput
                                type="password"
                                className="form-control w-100"
                                placeholder="Repeat password"
                                validators={['required', 'isPasswordMatch']}
                                errorMessages={['this field is required', 'Passwords must match']}
                                value={repeatedPassword}
                                onChange={this.handleInputChange('repeatedPassword')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row d-flex justify-content-center align-items-center">
                            <div className="col-10 ">
                              <ValidatedInput
                                type="text"
                                className="form-control w-100"
                                placeholder="Name"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                value={name}
                                onChange={this.handleInputChange('name')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4" />
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <button type="submit" className="btn btn-success">
                            Register
                          </button>
                        </div>
                        <div className="col-md-4" />
                      </div>
                      {registerError && <p>registerError</p>}
                      <br />
                    </ValidatorForm>
                    <div className="row">
                      <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <Link to="/login">
                          <h5>Login instead</h5>
                        </Link>
                      </div>
                    </div>
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
    registerError: state.error.registerError
  };
};

const mapDispatchToProps = {
  register
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
