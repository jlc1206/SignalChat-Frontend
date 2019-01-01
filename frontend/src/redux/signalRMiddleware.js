import * as SignalR from '@aspnet/signalr';
import { Globals } from '../globals';
import { loadMessages, addMessage, editMessage, deleteMessage, loadChatusers } from './actions';

export const SIGNALR_CONNECT = 'SIGNALR_CONNECT';

export const SIGNALR_LOAD_MESSAGES = 'SIGNALR_LOAD_MESSAGES';
export const SIGNALR_ADD_MESSAGE = 'SIGNALR_POST_MESSAGE';
export const SIGNALR_EDIT_MESSAGE = 'SIGNALR_EDIT_MESSAGE';
export const SIGNALR_DELETE_MESSAGE = 'SIGNALR_DELETE_MESSAGE';


export const signalRConnect = () => {
    return {
        type: SIGNALR_CONNECT
    };
};

export const signalRLoadMessages = () => {
    return {
        type: SIGNALR_LOAD_MESSAGES
    }
}

let chatHub;

const createSignalRMiddleware = store => next => async action => {
    console.log('SignalR Middleware invoked');
    switch (action.type) {        
        case SIGNALR_CONNECT:
            console.log('Connecting to SignalR');
            chatHub = new SignalR.HubConnectionBuilder()
                .withUrl(Globals.apiUrl + '/chatHub', { accessTokenFactory: () => localStorage.getItem('token') })
                .configureLogging(SignalR.LogLevel.Trace)
                .build();

            chatHub.on("Hello", () => alert("hello"));

            chatHub.on("LoadMessages", (messages) => store.dispatch(loadMessages(messages)));

            chatHub.on("AddMessage", (message) => store.dispatch(addMessage(message)));

            chatHub.on("EditMessage", (message) => store.dispatch(editMessage(message)));

            chatHub.on("DeleteMessage", (id) => store.dispatch(deleteMessage(id)));

            chatHub.on("LoadChatusers", (users) => store.dispatch(loadChatusers(users)));

            await chatHub.start().then(() => chatHub.invoke("Hello"));
            return;
        case SIGNALR_LOAD_MESSAGES:
            console.log('loading SignalR messages');
            chatHub.invoke("GetMessages");
            return;
        default:
            return next(action);
    }
}

export { createSignalRMiddleware };