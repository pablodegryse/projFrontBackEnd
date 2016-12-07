import {Component, OnInit} from "@angular/core";
import {User} from "../auth/user.model";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'pe-rankings',
    templateUrl: './views/componentViews/rankings.component.html'
})
export class RankingsComponent implements OnInit{
    users:User[];

    constructor(private _userService:UserService){

    }

    ngOnInit(){
        //this.users = this._userService.getUsers();
        this._userService.getUsers()
            .subscribe(
                (users:User[])=>{
                    this.users = users;
                    console.log(this.users);
                }
            );
    }

}