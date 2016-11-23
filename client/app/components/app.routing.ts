import { Routes, RouterModule } from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {AuthenticationComponent} from "./auth/authentication.component";
import {RankingsComponent} from "./rankings/rankings.component";
import {LobbyoverviewComponent} from "./lobby/lobbyoverview.component";
import {CreateRoomComponent} from "./room/create-room.component";
import {GameComponent} from "./game/game.component"

const APP_ROUTES: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    {path:'roomlist', component:LobbyoverviewComponent},
    {path:'createroom', component:CreateRoomComponent},
    {path:'quickjoin', component:GameComponent},
    {path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    {path:'rankings', component:RankingsComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);