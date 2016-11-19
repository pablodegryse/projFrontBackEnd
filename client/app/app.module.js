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
var canvas_component_1 = require("./components/canvas/canvas.component");
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
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [
                app_component_1.AppComponent,
                canvas_component_1.CanvasComponent,
                home_component_1.HomeComponent,
                dropdown_directives_1.DropdownDirective,
                header_component_1.HeaderComponent,
                authentication_component_1.AuthenticationComponent,
                register_component_1.RegisterComponent,
                signin_component_1.SigninComponent,
                logout_component_1.LogoutComponent,
                rankings_component_1.RankingsComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map