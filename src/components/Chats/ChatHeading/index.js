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
              <div className="indicator"></div>
              <span>{numberOfUsers ? numberOfUsers : null}</span>
            </div>
          </div>
      </Container>
    );
  }
}
