import * as SignalR from '@aspnet/signalr';
import { Globals } from '../globals';
import { LOAD_CHATUSERS, loadMessages } from './actions';

export const SIGNALRCONNECT = 'SIGNALRCONNECT';
export const signalRConnect = () => {
    return {
        type: SIGNALRCONNECT
    };
};

const createSignalRMiddleware = store => next => action => {
    console.log('SignalR Middleware setup');
    let chatHub;
            if (action.type === SIGNALRCONNECT) {
                console.log('Connecting to SignalR');
                chatHub = new SignalR.HubConnectionBuilder()
                .withUrl(Globals.apiUrl + '/chatHub', { accessTokenFactory: () => localStorage.getItem('token') })
                .configureLogging(SignalR.LogLevel.Trace)
                .build();

                chatHub.on("Hello", () => alert("hello"));

                chatHub.on("LoadMessages", (messages) => store.dispatch(loadMessages(messages)));

                chatHub.on("LoadChatusers", (payload) => store.dispatch(LOAD_CHATUSERS, payload));

                chatHub.start().then(() => chatHub.invoke("Hello")).then(() => chatHub.invoke("GetMessages"));
                return;
            }

            return next(action);        
}

export { createSignalRMiddleware };