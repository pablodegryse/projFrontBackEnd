import {Component} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";

@Component({
    selector:"pe-game",
    template:`<div>
                <pe-queue *ngIf="isGameReady===false"></pe-queue>
                <pe-canvas *ngIf="isGameReady===true" ></pe-canvas>
              </div>`
})

export class GameComponent {
    isGameReady:any=false;
    globalSocket:any;
    localsocketService:SocketService;
    router;
    constructor(private socketService:SocketService,private gameRouter:Router){
        this.localsocketService=socketService;
        this.globalSocket=this.localsocketService.getSocket();
        this.localsocketService.requestQueueMove();
        this.router=gameRouter;
        this.setGameEvents(this);
    }

    setGameEvents(component){
        this.globalSocket.on("GameReady",function (msg) {
            component.isGameReady=true;
            if(msg.content==="drawer"){
                console.log("I'm drawer");
            }else if(msg.content==="guesser"){
                console.log("I'm guesser");
            }
        });
        this.globalSocket.on("GameEnd",function (msg) {
            component.isGameReady=true;
            if(msg.content==="tooFewUsers"){
                component.router.navigateByUrl("/home");
            }
        });
    }

}