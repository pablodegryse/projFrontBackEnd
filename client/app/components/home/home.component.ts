import {Component} from "@angular/core";
import {SocketService} from "../../services/socket.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../auth/user.model";
import {NavService} from "../../services/nav.service";

@Component({
    selector: 'pe-home',
    templateUrl: './views/componentViews/home.component.html'
})
export class HomeComponent {

    user:User;
    socket:any;


    constructor(private _socketService:SocketService, private _authService:AuthService,private _navService:NavService){

        if(_socketService.initialLobbyJoin){
            this._socketService.lobbyJoin();
            _socketService.initialLobbyJoin=false;
        }else {
            this._socketService.requestLobbyMove();
        }
        _navService.changeNavSelection("Home");
    }

    ngOnInit(){
        var user=localStorage.getItem('user');
        if(user!=null && !''){
            this.user = JSON.parse(localStorage.getItem('user'));
        }else {
            this.user = new User('','','Guest');
        }
        this.socket = this._socketService.getSocket();
        this.socket.emit("addUserToSocket", this.user);
    }

    isLoggedIn(){
        return this._authService.isLoggedIn();
    }

}
