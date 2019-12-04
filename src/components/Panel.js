import React, { Component } from 'react';
import io from 'socket.io-client';

import { USER_CONNECT, LOGOUT } from '../Events';
import LoginForm from './Forms/LoginForm';
import SignUpForm from './Forms/SignUpForm';
import ChatContainer from './Chats/ChatContainer';

const socketUrl = 'http://localhost:3231';

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null,
      isLogin: true
    };
  }
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.info("It's On!");
    });
    this.setState({ socket });
  };

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECT, user);
    this.setState({ user });
  };

  isRegister = isLogin => {
    this.setState({ isLogin });
  };

  registerUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECT, user);
    this.setState({ isLogin: true });
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
    const { socket, user, isLogin } = this.state;
    return (
      <div className="container">
        {!user ? (
          <div className="container">
            {!isLogin ? (
              <SignUpForm socket={socket} registerUser={this.registerUser} isRegister={this.isRegister} />
            ) : (
              <LoginForm socket={socket} setUser={this.setUser} isRegister={this.isRegister} />
            )}
          </div>
        ) : (
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}
