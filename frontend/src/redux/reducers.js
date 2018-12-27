import { LOGIN_POST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_POST, REGISTER_SUCCESS, REGISTER_FAILURE } from "./actions";

const user = (state = { isLoggedIn: false, isLoggingIn: false, name: '', email: '', token: '', isRegistering: false, hasRegistered: false }, action) => {
  switch (action.type) {
    case LOGIN_POST:
      return Object.assign({}, state, { isLoggingIn: true });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, isLoggingIn: false, name: '', email: action.email, token: action.token });
    case LOGIN_FAILURE:
      return Object.assign({}, state, { isLoggingIn: false });
    case LOGOUT:
      return Object.assign({}, { isLoggingIn: false, isLoggedIn: false, name: '', email: '', token: '' });
    case REGISTER_POST:
      return Object.assign({}, { isLoggingIn: false, isLoggedIn: false, name: '', email: '', token: '', isRegistering: true });
    case REGISTER_SUCCESS:
      return Object.assign({}, { isLoggingIn: false, isLoggedIn: false, name: '', email: '', token: '', isRegistering: false, hasRegistered: true });
    case REGISTER_FAILURE:
      return Object.assign({}, { isLoggingIn: false, isLoggedIn: false, name: '', email: '', token: '', isRegistering: false, hasRegistered: false });
    default:
      return state;
  }
}

export { user };