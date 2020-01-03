import React, { Component } from 'react';
import io from 'socket.io-client';

import { USER_CONNECT, LOGOUT, VERIFY_USER } from '../Events';
import LoginForm from './Forms/LoginForm/index';
import SignUpForm from './Forms/SignUpForm/index';
import ChatContainer from './Chats/ChatContainer';

const socketUrl = 'https://socket-chat-io.herokuapp.com';

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

    if (this.state.user) {
      this.reconnect(socket);
    } else {
      console.info('Connected');
    }

    socket.on('connect', () => {
      console.info("It's On!");
    });
    this.setState({ socket });
  };

  reconnect = socket => {
    socket.emi(VERIFY_USER, this.state.user.email, this.state.user.password, ({ isUser, user }) => {
      if (isUser) {
        this.setState({ user: null });
      } else {
        this.setState({ user });
      }
    });
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
