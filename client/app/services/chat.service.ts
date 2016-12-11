import {Injectable} from "@angular/core";

@Injectable()
export class ChatService {
    public messages: any[] = [];

    constructor(){}

    addMessage(message: any) {
        this.messages.push(message);
    }

    getMessages() {
        return this.messages;
    }
}