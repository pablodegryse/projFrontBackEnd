import {Component} from "@angular/core";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-create-room',
    templateUrl: './views/componentViews/create-room.component.html'
})
export class CreateRoomComponent {
    constructor(private _socketService:SocketService){
        _socketService.requestLobbyMove();
    }
}
