import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Room} from "./room.model";

import {User} from "../auth/user.model";


@Component({
    selector: 'pe-room-item',
    templateUrl: './views/componentViews/room-item.component.html'
})
export class RoomItemComponent implements OnInit, OnDestroy{
    @Input() room:Room;
    user:User;

    constructor(){}

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
    console.log("joining room")
    }

    ngOnDestroy(){
        //this._roomService.roomIsUpdated.unsubscribe();
    }

}