import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Room} from "./room.model";

import {User} from "../auth/user.model";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";

@Component({
    selector: 'pe-room-item',
    templateUrl: './views/componentViews/room-item.component.html'
})
export class RoomItemComponent implements OnInit, OnDestroy{
    @Input() room:Room;
    user:User;

    constructor(private _roomService:RoomService, private _router:Router){}

    ngOnInit(){

        console.log('room-item created');
    }

    isFull(room){
        return (room.users.length == 4)? true:false;
    }

    onEditRoom(){
        console.log("room edited");

    }

    onJoinRoom(room:Room){
        this.user = JSON.parse(localStorage.getItem('user'))? JSON.parse(localStorage.getItem('user')): localStorage.setItem('user',JSON.stringify(new User('','','Free User','','')));
        console.log("user :" + this.user);
        room.users.push(this.user);
        this._roomService.updateRoom(room)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
    }

    ngOnDestroy(){
        //this._roomService.roomIsUpdated.unsubscribe();
    }

}