import React, { Component } from 'react';

import { Container } from './styles';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  render() {
    const { messages, user, typingUsers } = this.props;
    return (
      <Container ref="container">
        <div className="thread">
          {messages.map((mes, i) => {
            return (
              <div key={mes.time} className={`message-container ${mes.sender === user.username && 'right'}`}>
                <div className="time">{mes.time}</div>
                <div className="data">
                  <div className="message">{mes.message}</div>
                  <div className="name">{mes.sender}</div>
                </div>
              </div>
            );
          })}
          {typingUsers.map(name => {
            return (
              <div key={name} className="typing-user">
                {`${name} is typing...`}
              </div>
            );
          })}
        </div>


      </Container>
    );
  }
}