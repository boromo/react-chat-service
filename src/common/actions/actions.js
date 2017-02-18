import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';


export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

function loadingValidationList() {
  return {
    type: types.LOAD_USERVALIDATION
  };
}

function receiveValidationList(json) {
  return {
    type: types.LOAD_USERVALIDATION_SUCCESS,
    json
  };
}

export function usernameValidationList() {
  return (dispatch) => {
    dispatch(loadingValidationList());
    return fetch('/api/all_usernames')
      .then(response => response.json())
      .then(json => dispatch(receiveValidationList(json)))
      .catch((error) => {
        throw error;
      });
  };
}

function changeIsMobile(isMobile) {
  return {
    type: types.CHANGE_IS_MOBILE,
    isMobile
  };
}

function changeWidthAndHeight(screenHeight, screenWidth) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight,
    screenWidth
  };
}

export function initEnvironment() {
  return (dispatch) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    };
  };
}

function requestSignUp() {
  return {
    type: types.USER_SIGNUP
  };
}

function receiveUser(newUser) {
  return {
    type: types.USER_SIGNUP_SUCCESS,
    newUser
  };
}

export function signUp(user) {
  return (dispatch) => {
    dispatch(requestSignUp());
    return fetch('/api/sign_up', {
      method: 'post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then((json) => {
        dispatch(loadingValidationList(json.users));
        return dispatch(receiveUser(json.newUser));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function changeActiveUser(user) {
  return (dispatch) => {
    dispatch(receiveUser(user));
    browserHistory.push('/');
  };
}

function requestUserDelete() {
  return {
    type: types.USER_DELETE
  };
}

export function deleteUser(user) {
  return (dispatch) => {
    dispatch(requestUserDelete());
    return fetch('/api/user_delete', {
      method: 'post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => dispatch(receiveValidationList(json)))
      .catch((error) => {
        throw error;
      });
  };
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  };
}

function receiveMessages(json, channel) {
  const date = moment().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channel,
    date
  };
}

export function fetchMessages(channel) {
  return (dispatch) => {
    dispatch(requestMessages());
    return fetch(`/api/messages/${channel}`)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json, channel)))
      .catch((error) => {
        throw error;
      });
  };
}
