import React, { Component, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';

const UsersListItem = (props) => {
  const { user, onUserSelectClick, onDeleteClick } = props;
  return (
    <ListGroupItem>
      <a onClick={event => onUserSelectClick(event, user)} href="#">{user.username}</a>
      {
        onDeleteClick &&
        <span className="pull-right">
          <a onClick={event => onDeleteClick(event, user)} href="#">delete</a>
        </span>
      }
    </ListGroupItem>
  );
};

UsersListItem.proptypes = {
  user: PropTypes.object.isRequired,
  onUserSelectClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func
};

export default UsersListItem;
