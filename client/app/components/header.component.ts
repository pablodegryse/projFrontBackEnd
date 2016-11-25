import {Component, OnInit} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";


@Component({
    selector: 'pe-header',
    templateUrl: './views/componentViews/header.component.html'
})
export class HeaderComponent implements OnInit{


    constructor(private _authService:AuthService, private _router:Router){}

    ngOnInit(){

    }

    onLogOut(){
        this._authService.logout();
        this._router.navigateByUrl('/');
    }


}