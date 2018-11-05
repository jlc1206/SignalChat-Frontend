import * as reducers from './reducers';
import { combineReducers } from 'redux';

const ChatApp = combineReducers(reducers);

export default ChatApp;
