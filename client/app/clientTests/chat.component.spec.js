"use strict";
var chat_component_1 = require("../components/chat/chat.component");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var chat_service_1 = require("../services/chat.service");
var socket_service_1 = require("../services/socket.service");
var socketMock_service_1 = require("./socketMock.service");
//declare var CanvasDrawer:any;
describe('ChatComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var CanvasDrawer;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [chat_component_1.ChatComponent],
            imports: [forms_1.FormsModule],
            providers: [chat_service_1.ChatService, { provide: socket_service_1.SocketService, useClass: socketMock_service_1.socketMockService }]
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(chat_component_1.ChatComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        el = de.nativeElement;
    });
    it('should be created', function () {
        fixture = testing_1.TestBed.createComponent(chat_component_1.ChatComponent);
        comp = fixture.componentInstance;
        expect(comp).toBeTruthy();
    });
    it('should have an ul for chat output', function () {
        fixture = testing_1.TestBed.createComponent(chat_component_1.ChatComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        el = de.nativeElement;
        expect(el.className).toContain('chatOutput');
    });
});
//# sourceMappingURL=chat.component.spec.js.map