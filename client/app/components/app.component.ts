import { Component } from '@angular/core';
import {SocketService} from "../services/socket.service";

@Component({
    selector: 'pe-app',
    templateUrl: './views/componentViews/app.component.html',
    providers:[SocketService]
})
export class AppComponent {
    globalSocketService:SocketService;
    constructor(public socketService:SocketService){
        this.globalSocketService=socketService;
    }
}