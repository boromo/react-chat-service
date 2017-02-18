import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import UsersList from './UsersList';
import { deleteUser, changeActiveUser, usernameValidationList } from '../actions/actions';

class WelcomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userValidation: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(usernameValidationList());
  }

  onDeleteClick = (event, user) => {
    event.preventDefault();
    const { dispatch } = this.props;
    if (user && user.username) {
      dispatch(deleteUser(user));
    }
    return false;
  }

  onUserSelectClick = (event, user) => {
    event.preventDefault();
    const { dispatch } = this.props;
    if (user && user.username) {
      dispatch(changeActiveUser(user));
    }
    return false;
  }

  render() {
    const { userValidation } = this.props;
    return (
      <div className="container">
        <Header />
        <div className="jumbotron">
          <UsersList
            users={userValidation.data} onUserSelectClick={this.onUserSelectClick}
            onDeleteClick={this.onDeleteClick}
          />
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

export default connect(mapStateToProps)(WelcomePage);
