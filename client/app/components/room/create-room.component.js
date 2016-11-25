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
var forms_1 = require("@angular/forms");
var room_model_1 = require("./room.model");
var room_service_1 = require("../../services/room.service");
var CreateRoomComponent = (function () {
    function CreateRoomComponent(_roomService) {
        this._roomService = _roomService;
    }
    CreateRoomComponent.prototype.onSubmit = function () {
        var room = new room_model_1.Room(this.myForm.value.name);
        this._roomService.createRoom(room)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        this.myForm.reset();
    };
    CreateRoomComponent.prototype.ngOnInit = function () {
        this.myForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(null, forms_1.Validators.required),
        });
    };
    CreateRoomComponent = __decorate([
        core_1.Component({
            selector: 'pe-create-room',
            templateUrl: './views/componentViews/create-room.component.html'
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService])
    ], CreateRoomComponent);
    return CreateRoomComponent;
}());
exports.CreateRoomComponent = CreateRoomComponent;
//# sourceMappingURL=create-room.component.js.map