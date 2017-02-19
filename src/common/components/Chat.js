import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
import MessageComposer from './MessageComposer';

export default class Chat extends Component {
  static propTypes = {
    channelID: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    onMinimize: PropTypes.func
  };

  static defaultProps = {
    onMinimize: null
  }

  constructor(props) {
    super(props);
    this.state = {
      scroll: false
    };
  }

  componentDidMount() {
    const { socket, user, dispatch, channelID } = this.props;
    socket.emit('chat mounted', user);
    socket.emit('join channel', channelID);
    socket.on('new message stored', (msg) => {
      dispatch(actions.receiveRawMessage(msg));
    });
  }

  componentDidUpdate() {
    const wrapper = this.chatMessagesWrapper;
    const wrapperHeight = wrapper.clientHeight || false;
    const scrollableHeight = this.chatMessagesScrollable.clientHeight || false;
    if (!this.state.scroll && wrapperHeight &&
      scrollableHeight && scrollableHeight > wrapperHeight) {
      this.setState({ scroll: true });
    }
    wrapper.scrollTop = wrapper.scrollHeight - wrapper.clientHeight;
  }

  componentWillUnmount() {
    const { socket, channelID } = this.props;
    socket.emit('leave channel', channelID);
  }

  getMessages() {
    const { messages } = this.props;
    const _messages = [];
    if (messages && messages.length > 0) {
      for (const message of messages) {
        _messages.push(
          <div className="chat-message" key={message._id}>
            <div className="chat-user">{message.user}</div>
            <div className="chat-message-content">{message.text}</div>
          </div>
        );
      }
    }
    return _messages;
  }

  headerOnClick() {
    const { onMinimize } = this.props;
    if (onMinimize) {
      onMinimize();
    }
  }

  render() {
    const { socket, activeChannel, user, channelID } = this.props;
    return (
      <form style={{ height: '100%' }}>
        <div className="chat">
          <div className="chat-header" onClick={::this.headerOnClick}>{channelID}</div>
          <div className="chat-messages-wrapper" ref={(c) => { this.chatMessagesWrapper = c; }}>
            <div
              className={`chat-messages-scrollable${this.state.scroll ? ' scroll' : ''}`}
              ref={(c) => { this.chatMessagesScrollable = c; }}
            >
              {::this.getMessages()}
            </div>
          </div>
          <div className="chat-textarea">
            <MessageComposer socket={socket} activeChannel={activeChannel} user={user} channelID={channelID} />
          </div>
        </div>
      </form>
    );
  }
}

