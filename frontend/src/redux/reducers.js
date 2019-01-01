import { LOGIN_POST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_POST, REGISTER_SUCCESS, REGISTER_FAILURE,
   LOAD_MESSAGES, ADD_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE,
    LOAD_CHATUSERS, ADD_CHATUSER, EDIT_CHATUSER, LEAVE_CHATUSER } from "./actions";

const user = (state = { isLoggedIn: false, isLoggingIn: false, name: '', email: '', token: '', isRegistering: false, hasRegistered: false }, action) => {
  switch (action.type) {
    case LOGIN_POST:
      return Object.assign({}, state, { isLoggingIn: true });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, isLoggingIn: false, name: action.email, email: action.email, token: action.token });
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
};

const messages = (state = {}, action) => {
  switch(action.type) {
    case LOAD_MESSAGES:
      return Object.assign({},action.messages);
    case ADD_MESSAGE:
    case EDIT_MESSAGE:
      return Object.assign({},state, {[action.id]: {id: action.id, userID: action.userID,content: action.content}});    
    case DELETE_MESSAGE:
      let {newSet, ...deleted } = state;
      return Object.assign({},newSet);
    default:
      return state;
  }
};

const chatUsers = (state = {}, action) => {
  switch(action.type) {
    case LOAD_CHATUSERS:
      return Object.assign({},action.chatUsers);
    case ADD_CHATUSER:      
    case EDIT_CHATUSER:
      return Object.assign({},state, {[action.id]: {id: action.id, name: action.name, role: action.role}});
    case LEAVE_CHATUSER:
      let {newSet, ...left } = state;
      return Object.assign({},newSet);
    default:
      return state;
  }
};

export { user,messages, chatUsers };