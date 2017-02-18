import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChatContainer from '../containers/ChatContainer';
import Header from './Header';
import UsersList from './UsersList';
import * as actions from '../actions/actions';

class AdminPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userValidation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeChannel: null,
      admin: null
    };
  }


  componentWillMount() {
    const { dispatch, userValidation } = this.props;
    if (!userValidation.loaded) {
      dispatch(actions.usernameValidationList());
    }
  }

  onUserSelectClick = (event, user) => {
    event.preventDefault();
    if (user && user.username && !this.state.admin) {
      this.setState({ activeChannel: user.username, admin: this.findAdmin() });
    }
    return false;
  }

  findAdmin() {
    const { userValidation } = this.props;
    let admin = this.state.admin;
    if (userValidation.loaded && !this.state.admin) {
      userValidation.data.forEach((user) => {
        if (user.admin) {
          admin = user;
        }
      });
    }
    return admin;
  }

  render() {
    const { userValidation } = this.props;
    return (
      <div className="container">
        <Header />
        <div className="jumbotron">
          <h3 className="pullLeft">Admin chat</h3>
          {
            (this.state.activeChannel && this.state.admin) ?
              <div className="chat-container">
                <ChatContainer
                  user={this.state.admin}
                  channelID={this.state.activeChannel}
                />
              </div>
              :
              <div
                className
              >
                <p className="lead">Select user you want to support.</p>
                <UsersList
                  users={userValidation.data}
                  onUserSelectClick={this.onUserSelectClick}
                />
              </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userValidation: state.userValidation
  };
}

export default connect(mapStateToProps)(AdminPage);
