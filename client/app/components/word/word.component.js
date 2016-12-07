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
var WordComponent = (function () {
    function WordComponent(socketService) {
        this.socketService = socketService;
        this.selectedIndex = 0;
        this.canRefresh = true;
        this.hideListForSelected = false;
        this.globalSocket = socketService.getSocket();
        // this.setWordSocketEvent(this);
        // this.requestWordBatch();
    }
    WordComponent.prototype.ngOnInit = function () {
        // uncomment for offline testing =====> verwijderen voor release build
        this.words = [];
        this.words.push("test");
        this.words.push("car");
        this.words.push("tree");
    };
    WordComponent.prototype.setWordSocketEvent = function (component) {
        this.globalSocket.off("deliverWordBatch");
        this.globalSocket.on("deliverWordBatch", function (data) {
            console.log('words:' + data);
            component.canRefresh = data.rollStatus;
            component.words = [];
            for (var _i = 0, _a = data.words; _i < _a.length; _i++) {
                var word = _a[_i];
                component.words.push(word.word);
            }
        });
        this.globalSocket.off("wordChoiceConfirmed");
        this.globalSocket.on("wordChoiceConfirmed", function (word) {
            component.selectedWord = word;
            component.hideListForSelected = true;
        });
    };
    WordComponent.prototype.updateSelectedIndex = function (event) {
        this.selectedIndex = event.target.value;
    };
    WordComponent.prototype.requestWordBatch = function () {
        console.log("requested words");
        if (this.canRefresh) {
            this.globalSocket.emit("requestWordBatch");
        }
    };
    WordComponent.prototype.confirmWordChoice = function () {
        console.log("confirmed word");
        this.globalSocket.emit("confirmWordChoice", this.words[this.selectedIndex]);
    };
    WordComponent = __decorate([
        core_1.Component({
            selector: 'pe-word',
            templateUrl: './views/componentViews/word.component.html'
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService])
    ], WordComponent);
    return WordComponent;
}());
exports.WordComponent = WordComponent;
//# sourceMappingURL=word.component.js.map