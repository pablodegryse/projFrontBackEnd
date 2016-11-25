import { Component } from '@angular/core';
import {SocketService} from "../services/socket.service";

@Component({
    selector: 'pe-app',
    templateUrl: './views/componentViews/app.component.html',
    providers:[SocketService]
})
export class AppComponent {

    constructor(public _socketService:SocketService){
    }
}