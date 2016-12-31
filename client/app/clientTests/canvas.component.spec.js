"use strict";
var canvas_component_1 = require("../components/game/canvas.component");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
describe('CanvasComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [canvas_component_1.CanvasComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(canvas_component_1.CanvasComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('canvas'));
        el = de.nativeElement;
    });
    it('should have a drawCanvas element', function () {
        fixture.detectChanges();
        expect(el.id).toContain('drawCanvas');
    });
});
//# sourceMappingURL=canvas.component.spec.js.map