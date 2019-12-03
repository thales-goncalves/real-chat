import React, { Component } from 'react';

import { REGISTER_USER } from '../Events';

export default class components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      phone: '',
      password: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  registerUser = ({ response, registeredUser }) => {
    if (registeredUser) {
      this.setError(`${response.message}`);
    } else {
      this.props.registerUser(response);
      this.setError(`Welcome ${response.username}`);
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

    console.log('SENT');

    const { socket } = this.props;
    const { email, username, phone, password } = this.state;

    socket.emit(REGISTER_USER, email, username, phone, password, this.registerUser);
  };
  render() {
    const { email, username, phone, password, error } = this.state;
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
          <label htmlFor="username">
            <h2>Username</h2>
            <input
              id="username"
              value={username}
              type="text"
              ref={input => {
                this.textInput = input;
              }}
              onChange={this.handleChange}
              placeholder={'My Awesome nickname'}
            />
          </label>
          <label htmlFor="phone">
            <h2>Phone</h2>
            <input
              id="phone"
              value={phone}
              type="text"
              ref={input => {
                this.textInput = input;
              }}
              onChange={this.handleChange}
              placeholder={'My Phone Number'}
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
          <input className="login-btn" type="submit" value="Register" />
        </form>
      </div>
    );
  }
}
