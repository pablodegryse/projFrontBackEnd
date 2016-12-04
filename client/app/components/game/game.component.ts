import {Component} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";

@Component({
    selector:"pe-game",
    template:`<div>
                <pe-queue *ngIf="isGameReady===false"></pe-queue>
                <pe-room *ngIf="isGameReady===true" [gameRole]="gameParentRole" ></pe-room>
              </div>`
})

export class GameComponent{
    gameParentRole:string;
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
        if(component.socketService.gameEventsSet){
            this.globalSocket.off("GameReady");
            this.globalSocket.off("GameEnd");
        }else {
            this.socketService.gameEventsSet=true;
        }
        this.globalSocket.on("GameReady",function (msg) {
            console.log("yoloo sweeeeeeeeeeeeeeg");
            if(msg.content==="drawer"){
                component.gameParentRole="drawer";
            }else if(msg.content==="guesser"){
                component.gameParentRole="guesser";
            }
            component.isGameReady=true;
        });
        this.globalSocket.on("GameEnd",function (msg) {
            component.isGameReady=true;
            if(msg.content==="tooFewUsers"){
                component.router.navigateByUrl("/home");
            }
        });
    }

}