import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import * as actions from '../actions/actions';

export default class SignUpForm extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: ''
    };
  }

  componentWillMount() {
    const { dispatch, users } = this.props;
    if (!users.loaded) {
      dispatch(actions.usernameValidationList());
    }
  }

  getValidationState() {
    const length = this.state.username.length;
    if (length > 3 && this.validUsername()) return 'success';
    else if (length > 0) return 'error';
  }

  validUsername() {
    const { users } = this.props;
    if (users.data.length > 0 && users.data.filter(user => user.username.toLowerCase() === this.state.username.toLowerCase().trim()).length > 0) {
      return false;
    }
    return true;
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({
        username: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, onSubmit } = this.props;
    if (this.getValidationState() === 'success') {
      dispatch(actions.signUp({
        username: this.state.username,
        channelID: this.state.username
      }));
      this.setState({ username: '' });
      onSubmit();
    }
  }

  render() {
    return (
      <Form onSubmit={::this.handleSubmit}>
        <FormGroup validationState={::this.getValidationState()}>
          <FormControl
            name="username"
            type="text"
            placeholder="Your name"
            value={this.state.username}
            onChange={::this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button
          type="submit"
          className="btn btn-lg btn-success"
          onClick={::this.handleSubmit}
        >
          START CHAT
        </Button>
      </Form>
    );
  }
}
