import { Injectable } from '@angular/core'
declare var io:any;

@Injectable()
export class SocketService{
    roomListEventsSet:boolean=false;
    canvasEventsSet:boolean=false;
    gameEventsSet:boolean=false;
    initialLobbyJoin:boolean=true;
    socket:any;
    constructor(){
        this.socket=io("/global");
    }
    getSocket(){
        return this.socket;
    }

    //vraag aan de server om deze socket naar de lobby group te migreren
    requestLobbyMove(){
        this.socket.emit("requestMoveToLobby");
        console.log("request lobby movee!");
    }

    lobbyJoin(){
        this.socket.emit("initJoinLobby");
    }

    requestQueueMove(){
        this.socket.emit("requestMoveToQueue");
    }
}
