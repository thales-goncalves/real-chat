import React, { Component } from 'react';
import Profile from '../Profile/index';
import { FiMenu, FiSearch, FiPlus, FiLogOut, FiUser } from 'react-icons/fi';
import { SideBarOptions } from './SideBarOptions';
import { get, last, differenceBy } from 'lodash';

import '../../index.css';

export default class SideBar extends Component {
  static type = {
    CHATS: 'chats',
    USERS: 'users'
  };
  constructor(props) {
    super(props);

    this.state = {
      receiver: '',
      activeSideBar: SideBar.type.CHATS,
      showProfile: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { receiver } = this.state;
    const { onSendPrivateMessage } = this.props;
    onSendPrivateMessage(receiver);
    this.setState({ receiver: '' });
  };

  addChatForUser = reciever => {
    this.props.onSendPrivateMessage(reciever);
    this.setActiveSideBar(SideBar.type.CHATS);
  };

  setActiveSideBar = type => {
    this.setState({ activeSideBar: type });
  };

  createChatNameFromUsers = (users, excludeUser = '') => {
    return users.filter(u => u !== excludeUser).join(' & ') || 'Empty Users';
  };

  closeUserDetails = () => {
    this.setState({ showProfile: false });
  };

  render() {
    const { chats, activeChat, user, setActiveChat, logout, users, socket } = this.props;
    const { receiver, activeSideBar, showProfile } = this.state;
    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name">Real Chat</div>
          <div className="menu">
            <FiMenu />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="search">
          <i className="search-icon">
            <FiSearch />
          </i>
          <input
            placeholder="Search"
            type="text"
            value={receiver}
            onChange={event => {
              this.setState({ receiver: event.target.value });
            }}
          />
          <div>
            <FiPlus className="add" />
          </div>
        </form>
        <div className="side-bar-select">
          <div
            onClick={() => {
              this.setActiveSideBar(SideBar.type.CHATS);
            }}
            className={`side-bar-select__option ${activeSideBar === SideBar.type.CHATS ? 'active' : ''}`}
          >
            <span>Chats</span>
          </div>
          <div
            onClick={() => {
              this.setActiveSideBar(SideBar.type.USERS);
            }}
            className={`side-bar-select__option ${activeSideBar === SideBar.type.USERS ? 'active' : ''}`}
          >
            <span>Users</span>
          </div>
        </div>

        <div
          className="users"
          ref="users"
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {activeSideBar === SideBar.type.CHATS
            ? chats.map(chat => {
                return (
                  <SideBarOptions
                    key={chat.id}
                    name={chat.isCommunity ? chat.name : this.createChatNameFromUsers(chat.users, user.username)}
                    lastMessage={get(last(chat.messages), 'message', '')}
                    active={activeChat.id === chat.id}
                    onClick={() => {
                      this.props.setActiveChat(chat);
                    }}
                  />
                );
              })
            : differenceBy(users, [user], 'username').map(user => {
                return (
                  <SideBarOptions
                    key={user.id}
                    name={user.username}
                    onClick={() => {
                      this.addChatForUser(user.username);
                    }}
                  />
                );
              })}
        </div>
        <div className="current-user">
          <div
            className="user"
            onClick={() => {
              this.setState({ showProfile: !showProfile });
            }}
          >
            <FiUser />
            <span>{user.username}</span>
          </div>
          <div
            className="logout"
            title="Logout"
            onClick={() => {
              logout();
            }}
          >
            <FiLogOut />
          </div>
        </div>
        <div className="settings">
          {showProfile ? (
            <Profile socket={socket} logout={logout} user={user} closeUserDetails={this.closeUserDetails} />
          ) : null}
        </div>
      </div>
    );
  }
}
