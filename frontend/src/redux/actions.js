import axios from "axios";

import { Globals } from '../globals';
import { history } from '../App';

export const LOGIN_POST = "LOGIN_POST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

function loginPost() {
  return {
    type: LOGIN_POST,
  }
}

export function loginSuccess(loginResponse) {
  return {
    type: LOGIN_SUCCESS,
    username: loginResponse.userName,
    token: loginResponse.access_token,
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
      .then(response => response.json(),
        error => { console.log('api error', error) }
      )
      .then(json => {
        localStorage.setItem('token', json.access_token);
        localStorage.setItem('email', json.email);
        localStorage.setItem('expires', json['.expires']);
        dispatch(loginSuccess(json));
      })
      .catch(error => { console.log('Login failed: ', error); dispatch(loginFailure()) });
  }
}

export function doLogin(dispatch, email, pass) {
  dispatch(login(email, pass)).then(() => history.push('/'));
}
