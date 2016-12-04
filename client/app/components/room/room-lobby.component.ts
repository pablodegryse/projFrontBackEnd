import {Component} from "@angular/core";
import {User} from "../auth/user.model";

@Component({
    selector: 'pe-room-lobby',
    templateUrl: './views/componentViews/room-lobby.component.html'
})
export class RoomLobbyComponent {
    roomId: string;
    users: User[];
}