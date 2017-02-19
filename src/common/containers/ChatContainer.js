import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
import Chat from '../components/Chat';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch, channelID } = this.props;
    this.socket = io('', { path: '/api/chat' });
    this.socket.on('disconnect', function () {
      console.log('disconnect client event....');
    });
    dispatch(actions.fetchMessages(channelID));
  }

  componentWillUnmount() {
    this.socket.emit('disconnect');
  }

  render() {
    return (
      <Chat {...this.props} socket={this.socket} />
    );
  }
}
ChatContainer.propTypes = {
  channelID: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  onMinimize: PropTypes.func
};

function mapStateToProps(state) {
  return {
    messages: state.messages.data
  };
}
export default connect(mapStateToProps)(ChatContainer);
