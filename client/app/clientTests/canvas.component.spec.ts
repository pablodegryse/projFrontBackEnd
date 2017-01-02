import {CanvasComponent} from "../components/game/canvas.component";
import {ComponentFixture, TestBed, async, inject} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import any = jasmine.any;
import {SocketService} from "../services/socket.service";
import {socketMockService} from "./socketMock.service";
//declare var CanvasDrawer:any;

describe('CanvasComponent',()=>{
   let comp: CanvasComponent;
   let fixture: ComponentFixture<CanvasComponent>;
   let de : DebugElement;
   let el: HTMLElement;
   let CanvasDrawer:any;

   beforeEach(async(()=>{
      TestBed.configureTestingModule({
         declarations:[CanvasComponent],
         providers:[{provide:SocketService,useClass:socketMockService}]
      });
      TestBed.compileComponents();
   }));

   // beforeEach(inject([SocketService],(socketService:SocketService)=>{
   //    this.socketService = socketService;
   //    fixture = TestBed.createComponent(CanvasComponent);
   //    comp = fixture.componentInstance;
   //    de = fixture.debugElement.query(By.css('canvas'));
   //    el = de.nativeElement;
   // }));
   beforeEach(()=>{
      fixture = TestBed.createComponent(CanvasComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('canvas'));
      el = de.nativeElement;
   });

   // it('should have a drawCanvas element',()=>{
   //    fixture = TestBed.createComponent(CanvasComponent);
   //    comp = fixture.componentInstance;
   //    de = fixture.debugElement.query(By.css('canvas'));
   //    el = de.nativeElement;
   //    fixture.detectChanges();
   //    expect(el.id).toContain('drawCanvas');
   // });

});