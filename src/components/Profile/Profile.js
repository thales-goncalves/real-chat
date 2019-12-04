import React, { Component } from 'react';
import { DESTROY, UPDATE_USER } from '../../Events';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;

    this.state = {
      user: user,
      _id: user._id,
      email: user.email,
      username: user.username,
      address: user.address,
      phone: user.phone,
      password: user.password
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSave() {
    const { _id, email, username, address, phone, password } = this.state;
    const { socket } = this.props;
    socket.emit(UPDATE_USER, { id: _id, email, username, address, phone, password });
    const closeUserDetails = this.props.closeUserDetails;
    closeUserDetails();
  }
  handleClose() {
    this.setState({ showProfile: false });
    const closeUserDetails = this.props.closeUserDetails;
    closeUserDetails();
  }
  handleDelete() {
    const { email } = this.state;
    const { socket, logout } = this.props;
    socket.emit(DESTROY, { email });
    logout();
  }
  render() {
    const { email, username, address, phone, password } = this.state;

    return (
      <div className="settings-modal" tabIndex="-1" role="dialog">
        <div role="document">
          <div>
            <div className="settings-title">Settings</div>
          </div>
          <form className="settings-form">
            <label htmlFor="email" className="settings-label">
              Email
              <input
                disabled
                id="email"
                ref={input => {
                  this.textInput = input;
                }}
                onChange={this.handleChange}
                value={email}
              />
            </label>
            <label htmlFor="username" className="settings-label">
              Username
              <input
                id="username"
                disabled
                ref={input => {
                  this.textInput = input;
                }}
                type="text"
                onChange={this.handleChange}
                value={username}
              />
            </label>
            <label htmlFor="address" className="settings-label">
              Address
              <input
                id="address"
                ref={input => {
                  this.textInput = input;
                }}
                type="text"
                onChange={this.handleChange}
                value={address}
              />
            </label>
            <label htmlFor="phone" className="settings-label">
              Phone
              <input
                id="phone"
                ref={input => {
                  this.textInput = input;
                }}
                type="text"
                onChange={this.handleChange}
                value={phone}
              />
            </label>
            <label htmlFor="password" className="settings-label">
              Password
              <input
                id="password"
                ref={input => {
                  this.textInput = input;
                }}
                type="password"
                onChange={this.handleChange}
                value={password}
              />
            </label>

            <div className="setting-buttons">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  this.handleClose();
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="save"
                data-dismiss="modal"
                onClick={() => {
                  this.handleSave();
                }}
              >
                Save changes
              </button>
            </div>
            <div className="be-careful">
              <button
                className="delete-account"
                type="button"
                data-dismiss="modal"
                onClick={() => {
                  this.handleDelete();
                }}
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
