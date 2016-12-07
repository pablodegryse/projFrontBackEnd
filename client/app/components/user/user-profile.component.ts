import {Component, OnInit} from "@angular/core";
import {User} from "../auth/user.model";

@Component({
    selector: 'pe-user-profile',
    templateUrl: './views/componentViews/user-profile.component.html'
})
export class UserProfileComponent implements OnInit{

    user:User;


    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem('user'));
    }

}