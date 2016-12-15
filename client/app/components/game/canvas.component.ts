import {Component, ViewChild, AfterViewInit,Input,Output,EventEmitter} from '@angular/core';
import {SocketService} from "../../services/socket.service";
declare var CanvasDrawer:any;
@Component({
    selector:"pe-canvas",
    templateUrl:"./views/componentViews/canvas.component.html"
})

export class CanvasComponent implements AfterViewInit{
    @Input() gameRole:string;
    @Output() roleChanged:EventEmitter<string> =new EventEmitter<string>();
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
        if(this.socketService.canvasEventsSet){
            this.globalSocket.off("roleChanged");
            this.globalSocket.off("canvasCleared");
            this.globalSocket.off("drawBegin");
            this.globalSocket.off("drawEnd");
            this.globalSocket.off("drawUpdate");
            this.globalSocket.off("changedColor");
        }else {
            this.socketService.canvasEventsSet=true;
        }
        this.setCanvasEvents(this);
    }

    setCanvasEvents(component){
        this.globalSocket.on("roleChanged",function (role) {
            component.gameRole=role.content;
            component.roleChanged.emit(role.content);
            if(role.content==="guesser"){
                component.drawer.changeDrawPermission(false);
            }else if(role.content==="drawer"){
                component.drawer.changeDrawPermission(true);
            }
        });

        this.globalSocket.on("canvasCleared",function () {
           component.drawer.clearCanvas();
        });

        this.globalSocket.on("drawBegin",function () {
            component.drawer.setmouseDown();
        });

        this.globalSocket.on("drawEnd",function () {
            component.drawer.setMouseUp();
        });

        this.globalSocket.on("drawUpdate",function (msgObj) {
            component.drawer.drawToCanvas(msgObj);
        });

        this.globalSocket.on("changedColor",function (color) {
            component.drawer.changeColor(color);
        });
    }
}