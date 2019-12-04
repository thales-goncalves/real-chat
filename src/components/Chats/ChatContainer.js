import React, { Component } from 'react';

import {
  USER_CONNECT,
  USER_DISCONNECT,
  COMMUNITY_CHAT,
  MESSAGE_SEND,
  MESSAGE_RECEIVE,
  TYPING,
  PRIVATE_MESSAGE
} from '../../Events';
import SideBar from '../Sidebar/SideBar';
import ChatHeading from './ChatHeading';
import Messages from '../Messages/Messages';
import MessageInput from '../Messages/MessageInput';
import { values } from 'lodash';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      activeChat: null,
      users: [],
      show: false
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initSocket(socket);
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off(PRIVATE_MESSAGE);
    socket.off(USER_CONNECT);
    socket.off(USER_DISCONNECT);
  }

  initSocket(socket) {
    socket.emit(COMMUNITY_CHAT, this.resetChat);
    socket.on(PRIVATE_MESSAGE, this.addChat);
    socket.on('connect', () => {
      socket.emit(COMMUNITY_CHAT, this.resetChat);
    });
    socket.on(USER_CONNECT, users => {
      this.setState({ users: values(users) });
    });
    socket.on(USER_DISCONNECT, users => {
      this.setState({ users: values(users) });
    });
  }

  resetChat = chat => {
    return this.addChat(chat, true);
  };

  addChat = (chat, reset = false) => {
    const { socket } = this.props;
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({ chats: newChats, activeChat: reset ? chat : this.state.activeChat });

    const messageEvent = `${MESSAGE_RECEIVE}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(messageEvent, this.addMessageToChat(chat.id));
    socket.on(typingEvent, this.updateTypingInChat(chat.id));
  };

  addMessageToChat = chatId => {
    return message => {
      const { chats } = this.state;
      let newChats = chats.map(chat => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });
      this.setState({ chats: newChats });
    };
  };

  setOpenPriveteMessage = receiver => {
    const { socket, user } = this.props;
    const { activeChat } = this.state;
    socket.emit(PRIVATE_MESSAGE, { receiver, sender: user.username, activeChat });
  };

  updateTypingInChat = chatId => {
    return ({ isTyping, user }) => {
      if (user !== this.props.user.username) {
        const { chats } = this.state;
        let newChats = chats.map(chat => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user);
            }
          }
          return chat;
        });
        this.setState({ chats: newChats });
      }
    };
  };

  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SEND, { chatId, message });
  };

  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
  };

  setActiveChat = activeChat => {
    this.setState({ activeChat });
  };

  render() {
    let { user, logout, socket } = this.props;
    let { chats, activeChat, users } = this.state;
    return (
      <div className="container">
        <SideBar
          socket={socket}
          logout={logout}
          chats={chats}
          user={user}
          users={users}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
          onSendPrivateMessage={this.setOpenPriveteMessage}
        />
        <div className="chat-room-container">
          {activeChat !== null ? (
            <div className="chat-room">
              <ChatHeading name={activeChat.name} />
              <Messages messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers} />
              <MessageInput
                sendMessage={message => {
                  this.sendMessage(activeChat.id, message);
                }}
                sendTyping={isTyping => {
                  this.sendTyping(activeChat.id, isTyping);
                }}
              />
            </div>
          ) : (
            <div className="chat-room choose">
              <h3>Choose a chat</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}
