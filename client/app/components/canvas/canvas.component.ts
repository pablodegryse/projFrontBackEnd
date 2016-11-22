import {Component, ViewChild, Input, AfterViewInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
declare var CanvasDrawer:any;
@Component({
    selector:"pe-canvas",
    templateUrl:"./views/componentViews/canvas.component.html"
})

export class CanvasComponent implements AfterViewInit{
    @ViewChild('drawCanvas') drawCanvas;
    @ViewChild('buttonList') buttonList;
    @ViewChild('serverMessages') serverMessages;
    drawer:any;
    globalSocket:any;
    localsocketService:SocketService;
    constructor(private socketService:SocketService){
        this.localsocketService=socketService;
        this.globalSocket=this.localsocketService.getSocket();
        this.localsocketService.requestQueueMove();
    }
    ngAfterViewInit(){
        this.drawer=CanvasDrawer;
        this.drawer.init(this.drawCanvas.nativeElement,this.buttonList.nativeElement,this.globalSocket);
        //this.setSocketEvents(this.globalSocket,this.drawer,this.serverMessages);
    }


    setSocketEvents(socket,drawer,serverMessages){
        //TODO: fix this in de socket.on functies , want this slaat op de functie daarin
        socket.on("serverWelcome",function (event) {
            var msg="<p>"+event.time+"   "+event.msg+"</p>";
            serverMessages.nativeElement.innerHTML+=msg;
        });

        socket.on("serverAllowDraw",function (msg) {
            if(msg=='true'){
                drawer.changeDrawPermission(true)
            }else {
                drawer.changeDrawPermission(false)
            }
        });

        socket.on("observerRoomMessage",function (msg) {
            serverMessages.nativeElement.innerHTML+="<p>"+msg+"</p>";
        });

        socket.on("drawerRoomMessage",function (msg) {
            serverMessages.nativeElement.innerHTML+="<p>"+msg+"</p>";
        });


        socket.on("drawBegin",function () {
            drawer.setmouseDown();
            console.log("clicked mouse down");
        });

        socket.on("drawEnd",function () {
            drawer.setMouseUp();
            console.log("clicked mouse up");
        });

        socket.on("drawUpdate",function (msgObj) {
            drawer.drawToCanvas(msgObj);
        });

        socket.on("changedColor",function (color) {
            drawer.changeColor(color);
        });
    }


}