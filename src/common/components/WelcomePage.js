import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ChatContainer from '../containers/ChatContainer';
import Header from './Header';
import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';

class WelcomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userValidation: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      chatActive: false,
      minimizeChat: false
    };
  }

  componentWillMount() {
    this._tryActivatingChat(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.props.user !== nextProps.user) {
      this._tryActivatingChat(nextProps);
    }
  }

  _tryActivatingChat = (props) => {
    const { user } = props;
    if (user) {
      this.setState({
        chatActive: true
      });
    }
  }

  onSubmit() {
    this.setState({
      chatActive: false
    });
  }

  handleOnMinimize() {
    this.setState({ minimizeChat: !this.state.minimizeChat });
  }

  render() {
    const { userValidation, dispatch, user } = this.props;
    return (
      <div className="container">
        <Header />
        <div className="jumbotron">
          <h2>Welcome to our support service</h2>
          <p className="lead">Enter you desired username and press START CHAT button.</p>
          <SignUpForm users={userValidation} dispatch={dispatch} onSubmit={::this.onSubmit} />
        </div>
        {(this.state.chatActive) &&
        <div className={classNames('chat-overlay', { minimized: this.state.minimizeChat })}>
          <ChatContainer user={user} channelID={user.username} onMinimize={::this.handleOnMinimize} />
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    screenWidth: state.environment.screenWidth,
    user: state.userValidation.activeUser,
    userValidation: state.userValidation
  };
}

export default connect(mapStateToProps)(WelcomePage);
