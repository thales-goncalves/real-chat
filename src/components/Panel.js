import React, { Component } from 'react';
import io from 'socket.io-client';

import { USER_CONNECT, REGISTER_USER, LOGOUT } from '../Events';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ChatContainer from './Chats/ChatContainer.js';

const socketUrl = 'http://localhost:3231';

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };
  }
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.log("It's On!");
    });
    this.setState({ socket });
  };

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECT, user);
    this.setState({ user });
  };

  registerUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECT, user);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({
      user: null
    });
  };

  render() {
    const { socket, user } = this.state;
    return (
      <div className="container">
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          // <SignUpForm socket={socket} registerUser={this.registerUser} />
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}
