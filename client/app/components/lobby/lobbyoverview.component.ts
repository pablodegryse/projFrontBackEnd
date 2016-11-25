import {Component, OnInit} from '@angular/core';
import {Room} from "../room/room.model";
import {RoomService} from "../../services/room.service";

@Component({
    selector: 'pe-lobbyoverview',
    templateUrl: './views/componentViews/lobbyoverview.component.html'
})
export class LobbyoverviewComponent implements OnInit {
    rooms:Room[];

    constructor(private _roomService:RoomService) { }

    ngOnInit() {
        this._roomService.getRooms()
            .subscribe(
                (rooms:Room[])=>{
                    this.rooms = rooms;
                    console.log(this.rooms);
                }
            );
    }

}
