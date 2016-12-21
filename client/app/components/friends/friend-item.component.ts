import {Component, Input, Output, EventEmitter} from "@angular/core";
import {User} from "../auth/user.model";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'pe-friend-item',
    templateUrl: './views/componentViews/friend-item.component.html',
})
export class FriendItemComponent{
    @Input() friend:User;
    @Input() i:number;
    @Input() user:User;

    isSelected:boolean=false;

    @Output() isRemoved = new EventEmitter<any>();

    constructor(private _authService:AuthService,
                private _userService:UserService
    ){}

    onSelectFriend(user:User){
        this.isSelected = !this.isSelected;
    }

    onRemoveFriend(user:User){
        //noinspection TypeScriptUnresolvedVariable
        this.user.friends.splice(this.user.friends.indexOf(user.userId),1);
        this._userService.updateUser(this.user)
            .subscribe((user:User)=>{
                localStorage.setItem('user', JSON.stringify(this.user))
            });
        this.isRemoved.emit("remove");
    }

    isLoggedIn(){
        return this._authService.isLoggedIn();
    }

}