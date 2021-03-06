import {Component, Input, OnInit} from "@angular/core";
import {User} from "../auth/user.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'pe-rankings-item',
    templateUrl: './views/componentViews/rankings-item.component.html'
})
export class RankingsItemComponent implements OnInit{
    @Input() user:User;
    @Input() i:number;
    isSelected:boolean = false;
    currentUser:any;
    isFriend:boolean;

    constructor(private _userService:UserService,
                private _authService:AuthService){}

    ngOnInit(){
        var userInStorage=localStorage.getItem('user');
        if(userInStorage!=null && !''){
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        }
        this.isSelected = !this.isSelected;
        if((!this.isLoggedIn())){
            this.isFriend=true;
            return;
        }
        //noinspection TypeScriptUnresolvedVariable
        this.isFriend = (this.user.userId === this.currentUser._id)? true:false;
        for(let i=0;i<this.currentUser.friends.length;i++){
            if(this.user.userId === this.currentUser.friends[i]){
                this.isFriend = true;
            }
        }
    }

    isLoggedIn(){
        return this._authService.isLoggedIn();
    }

    onAddFriend(user:User){
        this.currentUser.friends.push(user.userId);
        this.isFriend =! this.isFriend;
        this._userService.updateUser(this.currentUser)
            .subscribe((data)=>
                localStorage.setItem('user', JSON.stringify(this.currentUser)));
    }
}