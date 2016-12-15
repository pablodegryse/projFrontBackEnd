import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {User} from "../auth/user.model";

@Component({
    selector:"pe-queue",
    template:`<div class="centreContentContainerColumn">
                <div class="loaderWrapper">
                      <div class="loader"></div>          
                </div>
                <h2 class="centreSubtitle">{{message}}</h2>
              </div>`
})

export class QueueComponent implements OnInit{
    message:string="You are in the queue, searching for a game...";
    user:User;
    socket:any;

    constructor(private _socketService:SocketService){}

    ngOnInit(){
        var user=localStorage.getItem('user');
        if(user!=null && !''){
            this.user = JSON.parse(localStorage.getItem('user'));
        }else {
            this.user = new User('','','Guest');
        }
        this.socket = this._socketService.getSocket();
        this.socket.emit("addUserToSocket", this.user);

        console.log('socket user in queue: ' + this.socket.user);
    }
}
