import { Routes } from "@angular/router";

import { SigninComponent } from "./signin.component";
import {RegisterComponent} from "./register.component";

export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'signin', component: SigninComponent },
];