import React, { Component, PropTypes } from 'react';
import UsersListItem from './UsersListItem';
import { ListGroup } from 'react-bootstrap';

export default class UsersList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    onUserSelectClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func
  };
  getActiveUsersList = () => {
    const { users, onUserSelectClick, onDeleteClick } = this.props;
    const activeUsersList = [];
    if (users && users.length > 0) {
      for (const user of users) {
        if (!user.admin) {
          activeUsersList.push(
            <UsersListItem
              key={`active-user-${user.username}`}
              user={user} onUserSelectClick={onUserSelectClick}
              onDeleteClick={onDeleteClick}
            />
          );
        }
      }
    }
    return activeUsersList;
  }

  render() {
    return (
      <ListGroup>
        {::this.getActiveUsersList()}
      </ListGroup>
    );
  }
}
