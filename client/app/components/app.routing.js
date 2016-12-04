"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var authentication_component_1 = require("./auth/authentication.component");
var rankings_component_1 = require("./rankings/rankings.component");
var lobbyoverview_component_1 = require("./lobby/lobbyoverview.component");
var create_room_component_1 = require("./room/create-room.component");
var game_component_1 = require("./game/game.component");
var room_component_1 = require("./room/room.component");
var APP_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'roomlist', component: lobbyoverview_component_1.LobbyoverviewComponent },
    { path: 'createroom', component: create_room_component_1.CreateRoomComponent },
    { path: 'room', component: room_component_1.RoomComponent },
    { path: 'quickjoin', component: game_component_1.GameComponent },
    { path: 'auth', component: authentication_component_1.AuthenticationComponent },
    { path: 'rankings', component: rankings_component_1.RankingsComponent }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map