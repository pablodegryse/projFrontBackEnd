import {Component, ViewChild, AfterViewInit,Input} from '@angular/core';
import {SocketService} from "../../services/socket.service";
declare var CanvasDrawer:any;
@Component({
    selector:"pe-canvas",
    templateUrl:"./views/componentViews/canvas.component.html"
})

export class CanvasComponent implements AfterViewInit{
    @Input() gameRole:string;
    drawer:any;
    globalSocket:any;
    localsocketService:SocketService;
    @ViewChild('drawCanvas') drawCanvas;
    @ViewChild('buttonList') buttonList;
    @ViewChild('serverMessages') serverMessages;
    constructor(private socketService:SocketService){
        this.localsocketService=socketService;
        this.globalSocket=socketService.getSocket();
        console.log("canvas ctor called");
    }
    ngAfterViewInit(){
        console.log("after init fired");
        this.drawer=CanvasDrawer;
        this.drawer.init(this.drawCanvas.nativeElement,this.buttonList.nativeElement,this.globalSocket);
        //de drawer initieliseren met deze rol
        console.log("game role is :"+this.gameRole);
        if(this.gameRole==="drawer"){
            this.drawer.changeDrawPermission(true);
        }else if(this.gameRole==="guesser"){ this.drawer.changeDrawPermission(false); }
        if(!this.socketService.canvasEventsSet){
            this.setCanvasEvents(this);
            this.socketService.canvasEventsSet=true;
        }
    }

    setCanvasEvents(component){
        this.globalSocket.on("drawBegin",function () {
            component.drawer.setmouseDown();
            console.log("clicked mouse down");
        });

        this.globalSocket.on("drawEnd",function () {
            component.drawer.setMouseUp();
            console.log("clicked mouse up");
        });

        this.globalSocket.on("drawUpdate",function (msgObj) {
            component.drawer.drawToCanvas(msgObj);
        });

        this.globalSocket.on("changedColor",function (color) {
            component.drawer.changeColor(color);
        });
    }
}