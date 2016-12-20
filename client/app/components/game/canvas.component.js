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
var core_1 = require("@angular/core");
var socket_service_1 = require("../../services/socket.service");
var CanvasComponent = (function () {
    function CanvasComponent(socketService) {
        this.socketService = socketService;
        this.roleChanged = new core_1.EventEmitter();
        this.localsocketService = socketService;
        this.globalSocket = socketService.getSocket();
        console.log("canvas ctor called");
    }
    CanvasComponent.prototype.ngAfterViewInit = function () {
        console.log("after init fired");
        this.drawer = CanvasDrawer;
        this.drawer.init(this.drawCanvas.nativeElement, this.buttonList.nativeElement, this.globalSocket);
        //de drawer initieliseren met deze rol
        console.log("game role is :" + this.gameRole);
        if (this.gameRole === "drawer") {
            this.drawer.changeDrawPermission(true);
        }
        else if (this.gameRole === "guesser") {
            this.drawer.changeDrawPermission(false);
        }
        if (this.socketService.canvasEventsSet) {
            this.globalSocket.off("roleChanged");
            this.globalSocket.off("canvasCleared");
            this.globalSocket.off("drawBegin");
            this.globalSocket.off("drawEnd");
            this.globalSocket.off("drawUpdate");
            this.globalSocket.off("changedColor");
        }
        else {
            this.socketService.canvasEventsSet = true;
        }
        this.setCanvasEvents(this);
    };
    CanvasComponent.prototype.setCanvasEvents = function (component) {
        this.globalSocket.on("roleChanged", function (role) {
            component.gameRole = role.content;
            component.roleChanged.emit(role.content);
            if (role.content === "guesser") {
                component.drawer.changeDrawPermission(false);
            }
            else if (role.content === "drawer") {
                component.drawer.changeDrawPermission(true);
            }
        });
        this.globalSocket.on("canvasCleared", function () {
            component.drawer.clearCanvas();
        });
        this.globalSocket.on("drawBegin", function () {
            component.drawer.setmouseDown();
        });
        this.globalSocket.on("drawEnd", function () {
            component.drawer.setMouseUp();
        });
        this.globalSocket.on("drawUpdate", function (msgObj) {
            component.drawer.drawToCanvas(msgObj);
        });
        this.globalSocket.on("changedColor", function (color) {
            component.drawer.changeColor(color);
        });
    };
    return CanvasComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CanvasComponent.prototype, "gameRole", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CanvasComponent.prototype, "roleChanged", void 0);
__decorate([
    core_1.ViewChild('drawCanvas'),
    __metadata("design:type", Object)
], CanvasComponent.prototype, "drawCanvas", void 0);
__decorate([
    core_1.ViewChild('buttonList'),
    __metadata("design:type", Object)
], CanvasComponent.prototype, "buttonList", void 0);
__decorate([
    core_1.ViewChild('serverMessages'),
    __metadata("design:type", Object)
], CanvasComponent.prototype, "serverMessages", void 0);
CanvasComponent = __decorate([
    core_1.Component({
        selector: "pe-canvas",
        templateUrl: "./views/componentViews/canvas.component.html"
    }),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], CanvasComponent);
exports.CanvasComponent = CanvasComponent;
//# sourceMappingURL=canvas.component.js.map