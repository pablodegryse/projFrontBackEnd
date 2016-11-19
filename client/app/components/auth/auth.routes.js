"use strict";
var signin_component_1 = require("./signin.component");
var register_component_1 = require("./register.component");
exports.AUTH_ROUTES = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'signin', component: signin_component_1.SigninComponent },
];
//# sourceMappingURL=auth.routes.js.map