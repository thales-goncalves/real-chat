import React, { Component } from 'react';

import { Container } from './styles';

export default class ChatHeading extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { name, numberOfUsers } = this.props;
    return (
      <Container>
          <div className="user-info">
            <div className="user-name">{name}</div>
            <div className="status">
              status
              <div className="indicator">indicator</div>
              <span>2</span>
            </div>
          </div>
      </Container>
    );
  }
}
