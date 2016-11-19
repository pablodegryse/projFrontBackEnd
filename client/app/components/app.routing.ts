import { Routes, RouterModule } from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {AuthenticationComponent} from "./auth/authentication.component";
import {RankingsComponent} from "./rankings/rankings.component";

const APP_ROUTES: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    {path:'canvas', component:CanvasComponent},
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    {path:'rankings', component:RankingsComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);