import {ChatComponent} from "../components/chat/chat.component";
import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import any = jasmine.any;
import {FormsModule} from "@angular/forms";
import {ChatService} from "../services/chat.service";
import {SocketService} from "../services/socket.service";
import {socketMockService} from "./socketMock.service";
//declare var CanvasDrawer:any;

describe('ChatComponent',()=>{
    let comp : ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;
    let de : DebugElement;
    let el: HTMLElement;
    let CanvasDrawer:any;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations:[ChatComponent],
            imports:[ FormsModule ],
            providers:[ ChatService, {provide:SocketService,useClass:socketMockService} ]
        });
        TestBed.compileComponents();
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(ChatComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('ul'));
        el = de.nativeElement;
    });

    it('should be created',()=>{
        fixture = TestBed.createComponent(ChatComponent);
        comp = fixture.componentInstance;
        expect(comp).toBeTruthy();
    });
    it('should have an ul for chat output',()=>{
        fixture = TestBed.createComponent(ChatComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('ul'));
        el = de.nativeElement;
        expect(el.className).toContain('chatOutput');
    });

});