import {Component} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {NavService} from "../../services/nav.service";
@Component({
    selector: 'pe-lobbyoverview',
    templateUrl: './views/componentViews/lobbyoverview.component.html'
})
export class LobbyoverviewComponent {
    roomList:any[];
    roomsAvailable:boolean=false;
    localSocket:any;
    constructor(private socketService:SocketService,private _navService:NavService) {
        this.localSocket=socketService.getSocket();
        socketService.requestLobbyMove();
        this.localSocket.emit("getRoomList");
        //check if the socket events were already set
        this.setRoomListEvents(this);
        _navService.changeNavSelection("Room List");
    }

    setRoomListEvents(component){
        if(this.socketService.roomListEventsSet){
            this.localSocket.off("roomListResult");
        }else {
            this.socketService.roomListEventsSet=true;
        }
        this.localSocket.on("roomListResult",function (result) {
            if(result.length>0){
                component.roomsAvailable=true;
                component.roomList=result;
            }
        });
        component.socketService.roomListEventsSet=true;
    }

}
