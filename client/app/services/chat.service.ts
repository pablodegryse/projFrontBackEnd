
import {Injectable} from "@angular/core";



@Injectable()
export class ChatService {
    public messages: any[] = [];


    constructor(){}

    addMessage(message: any) {
        console.log("chatservice msg received: " + message);
        this.messages.push(message);
        console.log("array in service : " + this.messages);
    }

    getMessages() {
        return this.messages;
    }

}