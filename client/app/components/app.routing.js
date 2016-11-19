"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var canvas_component_1 = require("./canvas/canvas.component");
var auth_routes_1 = require("./auth/auth.routes");
var authentication_component_1 = require("./auth/authentication.component");
var rankings_component_1 = require("./rankings/rankings.component");
var APP_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'canvas', component: canvas_component_1.CanvasComponent },
    { path: 'auth', component: authentication_component_1.AuthenticationComponent, children: auth_routes_1.AUTH_ROUTES },
    { path: 'rankings', component: rankings_component_1.RankingsComponent },
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map