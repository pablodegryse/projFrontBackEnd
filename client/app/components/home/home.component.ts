import {Component} from "@angular/core";
import {SocketService} from "../../services/socket.service";
import {AuthService} from "../../services/auth.service";
import {NavService} from "../../services/nav.service";

@Component({
    selector: 'pe-home',
    templateUrl: './views/componentViews/home.component.html'
})
export class HomeComponent {
    constructor(private _socketService:SocketService, private _authService:AuthService,private _navService:NavService){
        if(_socketService.initialLobbyJoin){
            this._socketService.lobbyJoin();
            _socketService.initialLobbyJoin=false;
        }else {
            this._socketService.requestLobbyMove();
        }
        _navService.changeNavSelection("Home");
    }

    isLoggedIn(){
        return this._authService.isLoggedIn();
    }

}
