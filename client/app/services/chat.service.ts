import { Message } from "../components/chat/message.model";
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class ChatService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private _http:Http){}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')? '?token=' + localStorage.getItem('token') : '';
        return this._http.post('http://localhost:8080/message/' + token, body, {headers:headers})
            .map((response:Response) => {
                const result = response.json();
                const message =  new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                return message;
            });
    }

    getMessages() {
        return this._http.get('http://localhost:8080/message/')
            .map((response:Response)=>{
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for(let message of messages){
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id)
                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            });
    }

}