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
        this._userService.getUsers()
            .subscribe(
                (users:User[])=> {
                    this.users = users.sort((a: any, b: any)=> {
                        if (a.points > b.points) {
                            return -1;
                        } else if (a.points < b.points) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    return users;
                }
            );
    }



}