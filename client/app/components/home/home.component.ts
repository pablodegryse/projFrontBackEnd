import {Component} from "@angular/core";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-home',
    templateUrl: './views/componentViews/home.component.html'
})
export class HomeComponent {
    localsocketService:SocketService;
    constructor(private socketService:SocketService){
        this.localsocketService=socketService;
        this.localsocketService.requestLobbyMove();
    }

}
