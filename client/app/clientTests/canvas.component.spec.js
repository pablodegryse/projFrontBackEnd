"use strict";
var canvas_component_1 = require("../components/game/canvas.component");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var socket_service_1 = require("../services/socket.service");
var socketMock_service_1 = require("./socketMock.service");
describe('CanvasComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var CanvasDrawer;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [canvas_component_1.CanvasComponent],
            providers: [{ provide: socket_service_1.SocketService, useClass: socketMock_service_1.socketMockService }]
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(canvas_component_1.CanvasComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('canvas'));
        el = de.nativeElement;
    });
});
//# sourceMappingURL=canvas.component.spec.js.map