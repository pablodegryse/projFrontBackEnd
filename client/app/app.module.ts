//this is the entry point to the application , we add our components here
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';
import {CanvasComponent} from "./components/canvas/canvas.component";
import {routing} from "./components/app.routing";
import {HomeComponent} from "./components/home/home.component";
import {DropdownDirective} from "./components/dropdown.directives";
import {HeaderComponent} from "./components/header.component";
import {AuthenticationComponent} from "./components/auth/authentication.component";
import {RegisterComponent} from "./components/auth/register.component";
import {SigninComponent} from "./components/auth/signin.component";
import {LogoutComponent} from "./components/auth/logout.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RankingsComponent} from "./components/rankings/rankings.component";

@NgModule({
    imports:[BrowserModule,routing, FormsModule,ReactiveFormsModule],
    declarations:[
        AppComponent,
        CanvasComponent,
        HomeComponent,
        DropdownDirective,
        HeaderComponent,
        AuthenticationComponent,
        RegisterComponent,
        SigninComponent,
        LogoutComponent,
        RankingsComponent
    ],
    bootstrap:[AppComponent]
})

export class AppModule{
}