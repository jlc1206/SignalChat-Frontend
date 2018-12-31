import * as SignalR from '@aspnet/signalr';
import { Globals } from '../globals';

const SignalRActions = {
    SEND_MESSAGE: "SEND_MESSAGE"
};

const createSignalRMiddleware = () => {

        let chatHub = new SignalR.HubConnectionBuilder().withUrl(Globals.apiUrl + '/chatHub').build();
        
        chatHub.on("Hello", () => alert("hello"));

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