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
        this.user = localStorage.getItem('userId');
        room.users.push(this.user);
        this._roomService.updateRoom(room)
            .subscribe(
                data => console.log(data),
                error => console.error(error),
                this._router.navigateByUrl('/quickjoin')
            );
    }

    ngOnDestroy(){
        //this._roomService.roomIsUpdated.unsubscribe();
    }

}