import React, { Component } from 'react';

import { VERIFY_USER } from '../Events';

export default class LoginForm extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
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

  setError = error => {
    this.setState({ error });
  };

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    const { socket } = this.props;
    const { email, password } = this.state;

    socket.emit(VERIFY_USER, email, password, this.setUser);
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="email">
            <h2>Email</h2>
            <input
              id="email"
              value={email}
              type="text"
              ref={input => {
                this.textInput = input;
              }}
              onChange={this.handleChange}
              placeholder={'My Email'}
            />
          </label>
          <label htmlFor="password">
            <h2>Password</h2>
            <input
              id="password"
              value={password}
              type="password"
              ref={input => {
                this.textInput = input;
              }}
              onChange={this.handleChange}
              placeholder={'MyTopSecr4tKey!'}
            />
          </label>
          <div className="error">{error ? error : null}</div>
          <br />
          <input className="login-btn" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
