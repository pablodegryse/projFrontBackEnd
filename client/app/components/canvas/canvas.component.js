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
var CanvasComponent = (function () {
    function CanvasComponent() {
    }
    CanvasComponent.prototype.ngAfterViewInit = function () {
        this.socket = io("/canvasDrawing");
        this.drawer = CanvasDrawer;
        this.drawer.init(this.drawCanvas.nativeElement, this.buttonList.nativeElement, this.socket);
        this.setSocketEvents(this.socket, this.drawer, this.serverMessages);
    };
    CanvasComponent.prototype.setSocketEvents = function (socket, drawer, serverMessages) {
        //TODO: fix this in de socket.on functies , want this slaat op de functie daarin
        socket.on("serverWelcome", function (event) {
            var msg = "<p>" + event.time + "   " + event.msg + "</p>";
            serverMessages.nativeElement.innerHTML += msg;
        });
        socket.on("serverAllowDraw", function (msg) {
            if (msg == 'true') {
                drawer.changeDrawPermission(true);
            }
            else {
                drawer.changeDrawPermission(false);
            }
        });
        socket.on("observerRoomMessage", function (msg) {
            serverMessages.nativeElement.innerHTML += "<p>" + msg + "</p>";
        });
        socket.on("drawerRoomMessage", function (msg) {
            serverMessages.nativeElement.innerHTML += "<p>" + msg + "</p>";
        });
        socket.on("drawBegin", function () {
            drawer.setmouseDown();
            console.log("clicked mouse down");
        });
        socket.on("drawEnd", function () {
            drawer.setMouseUp();
            console.log("clicked mouse up");
        });
        socket.on("drawUpdate", function (msgObj) {
            drawer.drawToCanvas(msgObj);
        });
        socket.on("changedColor", function (color) {
            drawer.changeColor(color);
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
        __metadata('design:paramtypes', [])
    ], CanvasComponent);
    return CanvasComponent;
}());
exports.CanvasComponent = CanvasComponent;
//# sourceMappingURL=canvas.component.js.map