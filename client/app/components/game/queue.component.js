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
var QueueComponent = (function () {
    function QueueComponent() {
        this.message = "You are in the queue, searching for a game...";
    }
    QueueComponent = __decorate([
        core_1.Component({
            selector: "pe-queue",
            template: "<div class=\"centreContentContainerColumn\">\n                <div class=\"loaderWrapper\">\n                      <div class=\"loader\"></div>          \n                </div>\n                <h2 class=\"centreSubtitle\">{{message}}</h2>\n              </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], QueueComponent);
    return QueueComponent;
}());
exports.QueueComponent = QueueComponent;
//# sourceMappingURL=queue.component.js.map