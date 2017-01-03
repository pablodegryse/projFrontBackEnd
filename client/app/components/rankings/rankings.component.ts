import {Component, OnInit, OnDestroy} from "@angular/core";
import {User} from "../auth/user.model";
import {UserService} from "../../services/user.service";
import {NavService} from "../../services/nav.service";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-rankings',
    templateUrl: './views/componentViews/rankings.component.html'
})
export class RankingsComponent implements OnInit, OnDestroy{
    users:User[];
    constructor(private _userService:UserService,private _navService:NavService,private _socketService:SocketService){
        _navService.changeNavSelection("Rankings");
        _socketService.requestLobbyMove();
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

    ngOnDestroy(){
    }

}