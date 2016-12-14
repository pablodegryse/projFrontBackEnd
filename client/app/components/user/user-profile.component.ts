import {Component, OnInit} from "@angular/core";
import {User} from "../auth/user.model";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-user-profile',
    templateUrl: './views/componentViews/user-profile.component.html'
})
export class UserProfileComponent implements OnInit{
    user:User;
    constructor(private _socketService:SocketService){
        _socketService.requestLobbyMove();
    }
    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem('user'));
    }

}