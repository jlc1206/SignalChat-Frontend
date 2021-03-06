import axios from "axios";

import { Globals } from '../globals';
import { history } from '../App';

export const LOGIN_POST = "LOGIN_POST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const REGISTER_POST = "REGISTER_POST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

function loginPost() {
  return {
    type: LOGIN_POST,
  }
}

export function loginSuccess(email, token) {
  return {
    type: LOGIN_SUCCESS,
    email: email,
    token: token,
  }
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  }
}

function login(email, pass) {
  return function (dispatch) {
    dispatch(loginPost());
    let formData = { grant_type: 'password', email: email, password: pass };
    let formBody = "";
    formBody = Object.keys(formData).map(elem => encodeURIComponent(elem) + "=" + encodeURIComponent(formData[elem])).join("&");

    return axios.post(Globals.apiUrl + Globals.tokenEndpoint, formBody)
      .then(response => {
        let expiry = Date.now() + 14000000000;
        localStorage.setItem('token', response.data);
        localStorage.setItem('email', email);
        localStorage.setItem('userName', email);
        localStorage.setItem('expires', expiry);
        dispatch(loginSuccess(email, response.data));
      },
        error => { console.log('api error', error) }
      )
      .catch(error => { console.log('Login failed: ', error); dispatch(loginFailure()) });
  }
}

export function doLogin(dispatch, email, pass) {
  dispatch(login(email, pass)).then(() => history.push('/'));
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('expires');

  return {
    type: LOGOUT
  }
}

function registerPost() {
  return {
    type: REGISTER_POST
  }
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  }
}

function registerFailure() {
  return {
    type: REGISTER_FAILURE
  }
}

function register(email, pass) {
  return function (dispatch) {
    dispatch(registerPost());

    return axios.post(Globals.apiUrl + Globals.registerEndpoint, {
      email: email, password: pass
    })
      .then(response => response.json(),
        error => { console.log('api error', error) }
      )
      .then(json => {
        // what do
        dispatch(registerSuccess(json));
      })
      .catch(error => { console.log('Registration failed: ', error); dispatch(registerFailure()) });
  }
}

export function doRegister(dispatch, email, pass) {
  dispatch(register(email, pass)).then(() => history.push('/'));
}

export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export function loadMessages(messages) {
  return {
    type: LOAD_MESSAGES,
    messages: messages
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message: message
  }
}

export function editMessage(message) {
  return {
    type: EDIT_MESSAGE,
    message: message
  }
}

export function deleteMessage(id) {
  return {
    type: DELETE_MESSAGE,
    id: id
  }
}

export const LOAD_CHATUSERS = 'LOAD_CHATUSERS';
export const ADD_CHATUSER = 'ADD_CHATUSER';
export const EDIT_CHATUSER = 'EDIT_CHATUSER';
export const LEAVE_CHATUSER = 'LEAVE_CHATUSER';

export function loadChatusers (users) {
  return {
    type: LOAD_CHATUSERS,
    users: users
  }
}