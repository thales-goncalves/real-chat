import React, { Component } from 'react';

import { Container } from './styles';
import { REGISTER_USER } from '../../../Events';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export default class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      phone: '',
      password: '',
      address: '',
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

  registerUser = ({ response, registeredUser }) => {
    if (registeredUser) {
      this.setError(`${response.message}`);
    } else {
      this.props.registerUser(response);
    }
  };

  login = () => {
    this.props.isRegister(true);
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
      case 'username':
        errors.username = value.length < 5 ? 'Full Name must be 5 characters long!' : '';
        break;
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
      const { email, username, address, phone, password } = this.state;
      socket.emit(REGISTER_USER, email, username, address, phone, password, this.registerUser);
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
    const { email, username, password, error, errors } = this.state;
    return (

      <Container>
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
          <label htmlFor="username">
            <h2>Username</h2>
            <input
              required
              id="username"
              value={username}
              type="text"
              ref={input => {
                this.textInput = input;
              }}
              onChange={this.handleChange}
              placeholder={'Coolest Nickname Ever!!'}
            />
            {errors.username.length > 0 && <span className="error">{errors.username}</span>}
          </label>
          {/* <label htmlFor="phone">
                <h2>Phone</h2>
                <input
                  id="phone"
                  value={phone}
                  type="text"
                  ref={input => {
                    this.textInput = input;
                  }}
                  onChange={this.handleChange}
                  placeholder={' +1 4085 55 1234'}
                />
              </label>
              <label htmlFor="address">
                <h2>Address</h2>
                <input
                  id="address"
                  value={address}
                  type="text"
                  ref={input => {
                    this.textInput = input;
                  }}
                  onChange={this.handleChange}
                  placeholder={'Address ??'}
                />
              </label> */}
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
          <input className="login-btn" type="submit" value="Register" />
          <br />
          <div>
            <span>
              Already have an account?{' '}
              <a
                href="#"
                onClick={() => {
                  this.login(true);
                }}
              >
                Login
                  </a>
            </span>
          </div>
        </form>
      </Container>
    );
  }
}
