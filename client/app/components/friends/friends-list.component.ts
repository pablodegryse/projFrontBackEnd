import {Component, OnInit, Output} from "@angular/core";
import {User} from "../auth/user.model";
import {UserService} from "../../services/user.service";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-friends-list',
    templateUrl: './views/componentViews/friends-list.component.html'

})
export class FriendsListComponent implements OnInit{
    friends:User[];
    @Output() user:User;

    constructor(private _userService:UserService,private _socketService:SocketService){
        _socketService.requestLobbyMove();
    }

    ngOnInit(){
        var userInStorage=localStorage.getItem('user');
        if(userInStorage!=null && !''){
            this.user = JSON.parse(localStorage.getItem('user'));
        }

        this._userService.getFriends(this.user)
            .subscribe((friends:User[])=>{
                this.friends = friends;
                console.log(this.friends);
            });
    }

    onRemoved(){
        this._userService.getFriends(this.user)
            .subscribe((friends:User[])=>{
                this.friends = friends;
                console.log(this.friends);
            });
    }

}