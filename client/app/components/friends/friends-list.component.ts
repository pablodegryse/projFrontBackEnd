import {Component, OnInit, Output} from "@angular/core";
import {User} from "../auth/user.model";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'pe-friends-list',
    templateUrl: './views/componentViews/friends-list.component.html'

})
export class FriendsListComponent implements OnInit{
    friends:User[];
    @Output() user:User;

    constructor(private _userService:UserService){
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

}