import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
declare var CanvasDrawer:any;
@Component({
    selector:"pe-canvas",
    templateUrl:"./views/componentViews/canvas.component.html"
})

export class CanvasComponent implements AfterViewInit{
    drawer:any;
    globalSocket:any;
    @ViewChild('drawCanvas') drawCanvas;
    @ViewChild('buttonList') buttonList;
    @ViewChild('serverMessages') serverMessages;
    constructor(private socketService:SocketService){
        this.globalSocket=socketService.getSocket();
    }
    ngAfterViewInit(){
        console.log("after init fired");
        this.drawer=CanvasDrawer;
        this.drawer.init(this.drawCanvas.nativeElement,this.buttonList.nativeElement,this.globalSocket);
        this.setCanvasEvents(this);
    }

    setCanvasEvents(component){
        //de drawer initieliseren met deze rol
        this.globalSocket.on("RoleInit",function (msg) {
            if(msg==="drawer"){
                component.drawer.changeDrawPermission(true);
            }else if(msg==="guesser"){
                component.drawer.changeDrawPermission(false);
            }
        });

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
