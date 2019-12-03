import React, { Component } from 'react';

import { COMMUNITY_CHAT, MESSAGE_SEND, MESSAGE_RECEIVE, TYPING } from '../../Events';
import SideBar from './SideBar';
import ChatHeading from './ChatHeading';
import Messages from '../Messages/Messages';
import MessageInput from '../Messages/MessageInput';

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      activeChat: null
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initSocket(socket);
  }

  initSocket(socket) {
    socket.emit(COMMUNITY_CHAT, this.resetChat);
  }

  resetChat = chat => {
    return this.addChat(chat, true);
  };

  addChat = (chat, reset) => {
    const { socket } = this.props;
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({ chats: newChats });

    console.log(chat.id);
    const messageEvent = `${MESSAGE_RECEIVE}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(messageEvent, this.addMessageToChat(chat.id));
    socket.on(typingEvent);
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
    let { user, logout } = this.props;
    let { chats, activeChat } = this.state;
    return (
      <div className="container">
        <SideBar logout={logout} chats={chats} user={user} activeChat={activeChat} setActiveChat={this.setActiveChat} />
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
