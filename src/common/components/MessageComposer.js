import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Input } from 'react-bootstrap';
import uuid from 'node-uuid';

export default class MessageComposer extends Component {

  static propTypes = {
    channelID: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      typing: false
    };
  }

  handleSubmit(event) {
    if (event.charCode === 13 && !event.shiftKey) {
      event.preventDefault();
      const { user, socket, channelID } = this.props;
      const text = event.target.value.trim();
      var newMessage = {
        id: `${Date.now()}${uuid.v4()}`,
        channelID,
        text,
        user: user.username,
        time: moment.utc().format('lll')
      };
      socket.emit('new message', newMessage);
      this.setState({ value: '' });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <textarea
        placeholder="Write message here..."
        value={this.state.value}
        onChange={::this.handleChange}
        onKeyPress={::this.handleSubmit}
      />
    );
  }
}
