import {Component} from "@angular/core";
import {SocketService} from "../../services/socket.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'pe-home',
    templateUrl: './views/componentViews/home.component.html'
})
export class HomeComponent {

    constructor(private _socketService:SocketService, private _authService:AuthService){
        if(_socketService.initialLobbyJoin){
            this._socketService.lobbyJoin();
            _socketService.initialLobbyJoin=false;
        }else {
            this._socketService.requestLobbyMove();
        }
    }

    isLoggedIn(){
        return this._authService.isLoggedIn();
    }

}
