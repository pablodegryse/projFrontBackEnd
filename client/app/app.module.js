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
//this is the entry point to the application , we add our components here
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./components/app.component');
var app_routing_1 = require("./components/app.routing");
var home_component_1 = require("./components/home/home.component");
var dropdown_directives_1 = require("./components/dropdown.directives");
var header_component_1 = require("./components/header.component");
var authentication_component_1 = require("./components/auth/authentication.component");
var register_component_1 = require("./components/auth/register.component");
var signin_component_1 = require("./components/auth/signin.component");
var logout_component_1 = require("./components/auth/logout.component");
var forms_1 = require("@angular/forms");
var rankings_component_1 = require("./components/rankings/rankings.component");
var lobbyoverview_component_1 = require("./components/lobby/lobbyoverview.component");
var create_room_component_1 = require("./components/room/create-room.component");
var room_item_component_1 = require("./components/room/room-item.component");
var auth_service_1 = require("./services/auth.service");
var http_1 = require("@angular/http");
var room_service_1 = require("./services/room.service");
var canvas_component_1 = require("./components/game/canvas.component");
var queue_component_1 = require("./components/game/queue.component");
var game_component_1 = require("./components/game/game.component");
var room_component_1 = require("./components/room/room.component");
var chat_component_1 = require("./components/chat/chat.component");
var word_component_1 = require("./components/word/word.component");
var room_lobby_component_1 = require("./components/room/room-lobby.component");
var chat_service_1 = require("./services/chat.service");
var user_profile_component_1 = require("./components/user/user-profile.component");
var user_service_1 = require("./services/user.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_1.routing,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                canvas_component_1.CanvasComponent,
                queue_component_1.QueueComponent,
                game_component_1.GameComponent,
                home_component_1.HomeComponent,
                dropdown_directives_1.DropdownDirective,
                header_component_1.HeaderComponent,
                authentication_component_1.AuthenticationComponent,
                register_component_1.RegisterComponent,
                signin_component_1.SigninComponent,
                logout_component_1.LogoutComponent,
                rankings_component_1.RankingsComponent,
                lobbyoverview_component_1.LobbyoverviewComponent,
                create_room_component_1.CreateRoomComponent,
                room_item_component_1.RoomItemComponent,
                chat_component_1.ChatComponent,
                room_component_1.RoomComponent,
                word_component_1.WordComponent,
                room_lobby_component_1.RoomLobbyComponent,
                user_profile_component_1.UserProfileComponent
            ],
            providers: [auth_service_1.AuthService, room_service_1.RoomService, chat_service_1.ChatService, user_service_1.UserService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map