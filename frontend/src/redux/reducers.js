import { LOGIN_POST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER } from "./actions";

const user = (state = { isLoggedIn: false, isLoggingIn: false, name: '', email: '', token: '' }, action) => {
  switch (action.type) {
    case LOGIN_POST:
      return Object.assign({}, state, { isLoggingIn: true });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, isLoggingIn: false, name: action.username, token: action.token });
    case LOGIN_FAILURE:
      return Object.assign({}, state, { isLoggingIn: false });
    case LOGOUT:
      return Object.assign({}, { isLoggingIn: false, isLoggedIn: false, name: '', token: '' });
    default:
      return state;
  }
}

export { user };