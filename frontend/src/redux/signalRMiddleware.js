import * as SignalR from '@aspnet/signalr';
import { Globals } from '../globals';
import { LOAD_MESSAGES, LOAD_CHATUSERS } from './actions';

const SignalRActions = {
    SEND_MESSAGE: "SEND_MESSAGE"
};

const createSignalRMiddleware = store => {

        let chatHub = new SignalR.HubConnectionBuilder().withUrl(Globals.apiUrl + '/chatHub').build();
        
        chatHub.on("Hello", () => alert("hello"));

        chatHub.on("LoadMessages", (payload) => store.dispatch(LOAD_MESSAGES,payload));

        chatHub.on("LoadChatusers", (payload) => store.dispatch(LOAD_CHATUSERS, payload));

        chatHub.start().then(() => chatHub.send("Hello"));        

        return next =>
            action => {
                if (false) {
                    return;
                }

                return next(action);
            }    
}

export { SignalRActions, createSignalRMiddleware };