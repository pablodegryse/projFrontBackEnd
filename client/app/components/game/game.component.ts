import {Component} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {Router} from "@angular/router";
import {User} from "../auth/user.model";
import {NavService} from "../../services/nav.service";

@Component({
    selector:"pe-game",
    template:`
                <pe-queue *ngIf="isGameReady===false"></pe-queue>
                <pe-room *ngIf="isGameReady===true" [gameRole]="gameParentRole" ></pe-room>`
})

export class GameComponent{
    gameParentRole:string;
    isGameReady:any=false;
    globalSocket:any;
    localsocketService:SocketService;
    user:User;
    router;
    constructor(private socketService:SocketService,private gameRouter:Router,private _navService:NavService){
        this.localsocketService=socketService;
        this.globalSocket=this.localsocketService.getSocket();
        this.globalSocket.user = this.user;
        this.localsocketService.requestQueueMove();
        this.router=gameRouter;
        this.setGameEvents(this);
        _navService.changeNavSelection("Quick Join");
    }

    setGameEvents(component){
        if(component.socketService.gameEventsSet){
            this.globalSocket.off("GameReady");
            this.globalSocket.off("GameEnd");
            this.globalSocket.off("gameConcluded");
        }else {
            this.socketService.gameEventsSet=true;
        }
        this.globalSocket.on("gameConcluded",function (endMsg) {
        });

        this.globalSocket.on("GameReady",function (msg) {
            if(msg.content==="drawer"){
                component.gameParentRole=msg.content;
            }else if(msg.content==="guesser"){
                component.gameParentRole=msg.content;
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