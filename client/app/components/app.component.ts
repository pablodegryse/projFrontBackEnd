import {Component, OnDestroy, enableProdMode} from '@angular/core';
import {SocketService} from "../services/socket.service";
import {AuthService} from "../services/auth.service";
enableProdMode();

@Component({
    selector: 'pe-app',
    templateUrl: './views/componentViews/app.component.html',
    providers:[SocketService]
})
export class AppComponent implements OnDestroy{

    constructor(public _socketService:SocketService,
    private _authService:AuthService){
    }

    ngOnDestroy(){
        this._authService.logout();
    }
}