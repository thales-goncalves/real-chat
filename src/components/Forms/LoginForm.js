import React, { Component } from 'react';

import { VERIFY_USER } from '../../Events';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export default class LoginForm extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      errors: {
        username: '',
        email: '',
        password: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUser = ({ response, isUser }) => {
    if (!isUser) {
      this.setError(`${response.message}`);
    } else {
      this.setError('');
      this.props.setUser(response);
    }
  };

  login = () => {
    this.props.isRegister(false);
  };

  setError = error => {
    this.setState({ error });
  };

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

    let errors = this.state.errors;
    const { id, value } = event.target;
    switch (id) {
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password = value.length < 5 ? 'Password must be 5 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [id]: value });
  }
  handleSubmit = event => {
    event.preventDefault();
    const { socket } = this.props;

    if (this.validateForm(this.state.errors)) {
      const { email, password } = this.state;
      socket.emit(VERIFY_USER, email, password, this.setUser);
    } else {
      alert('Invalid Form');
    }
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  render() {
    const { email, password, error, errors } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="email">
            <h2>Email</h2>
            <input
              required
              id="email"
              value={email}
              type="text"
              ref={input => {
                this.textInput = input;
              }}
              onChange={this.handleChange}
              placeholder={'My Email'}
            />
            {errors.email.length > 0 && <span className="error">{errors.email}</span>}
          </label>
          <label htmlFor="password">
            <h2>Password</h2>
            <input
              required
              id="password"
              value={password}
              type="password"
              ref={input => {
                this.textInput = input;
              }}
              onChange={this.handleChange}
              placeholder={'MyTopSecr4tKey!'}
            />
            {errors.password.length > 0 && <span className="error">{errors.password}</span>}
          </label>
          <div className="error">{error ? error : null}</div>
          <br />
          <input className="login-btn" type="submit" value="Login" />
          <br />
          <div>
            <span>
              Don't have account?{' '}
              <a
                href="#"
                onClick={() => {
                  this.login(false);
                }}
              >
                Sign Up
              </a>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
