"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var socket_service_1 = require("../../services/socket.service");
var CanvasComponent = (function () {
    function CanvasComponent(socketService) {
        this.socketService = socketService;
        this.localsocketService = socketService;
        this.globalSocket = socketService.getSocket();
    }
    CanvasComponent.prototype.ngAfterViewInit = function () {
        console.log("after init fired");
        this.drawer = CanvasDrawer;
        this.drawer.init(this.drawCanvas.nativeElement, this.buttonList.nativeElement, this.globalSocket);
        this.setCanvasEvents(this);
    };
    CanvasComponent.prototype.setCanvasEvents = function (component) {
        //de drawer initieliseren met deze rol
        this.globalSocket.on("RoleInit", function (msg) {
            if (msg === "drawer") {
                component.drawer.changeDrawPermission(true);
            }
            else if (msg === "guesser") {
                component.drawer.changeDrawPermission(false);
            }
        });
        this.globalSocket.on("drawBegin", function () {
            component.drawer.setmouseDown();
            console.log("clicked mouse down");
        });
        this.globalSocket.on("drawEnd", function () {
            component.drawer.setMouseUp();
            console.log("clicked mouse up");
        });
        this.globalSocket.on("drawUpdate", function (msgObj) {
            component.drawer.drawToCanvas(msgObj);
        });
        this.globalSocket.on("changedColor", function (color) {
            component.drawer.changeColor(color);
        });
    };
    __decorate([
        core_1.ViewChild('drawCanvas'), 
        __metadata('design:type', Object)
    ], CanvasComponent.prototype, "drawCanvas", void 0);
    __decorate([
        core_1.ViewChild('buttonList'), 
        __metadata('design:type', Object)
    ], CanvasComponent.prototype, "buttonList", void 0);
    __decorate([
        core_1.ViewChild('serverMessages'), 
        __metadata('design:type', Object)
    ], CanvasComponent.prototype, "serverMessages", void 0);
    CanvasComponent = __decorate([
        core_1.Component({
            selector: "pe-canvas",
            templateUrl: "./views/componentViews/canvas.component.html"
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService])
    ], CanvasComponent);
    return CanvasComponent;
}());
exports.CanvasComponent = CanvasComponent;
//# sourceMappingURL=canvas.component.js.map