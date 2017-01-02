import {CanvasComponent} from "../components/game/canvas.component";
import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import any = jasmine.any;
describe('CanvasComponent',()=>{
   let comp: CanvasComponent;
   let fixture: ComponentFixture<CanvasComponent>;
   let de : DebugElement;
   let el: HTMLElement;

   beforeEach(async(()=>{
      TestBed.configureTestingModule({
         declarations:[CanvasComponent]
      });
      TestBed.compileComponents();
   }));

   beforeEach(()=>{
      fixture = TestBed.createComponent(CanvasComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('canvas'));
      el = de.nativeElement;
   });

   it('should have a drawCanvas element',()=>{
      fixture.detectChanges();
      expect(el.id).toContain('drawCanvas');
   });

});