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
        this.setMainEvents();
    }
    getSocket(){
        return this.socket;
    }

    //zet de client socket events , zodat we acties/berichten van de server kunnen opvangen
    setMainEvents(){
        this.socket.on("welcome",function (msg) {
            console.log("SERVER MSG: "+msg.content);
        });
        this.socket.on("info",function (msg) {
            console.log("SERVER INFO: "+msg);
        });
    }

    //vraag aan de server om deze socket naar de lobby group te migreren
    requestLobbyMove(){
        this.socket.emit("requestMoveToLobby");
    }

    lobbyJoin(){
        this.socket.emit("initJoinLobby");
    }

    requestQueueMove(){
        this.socket.emit("requestMoveToQueue");
    }
}
