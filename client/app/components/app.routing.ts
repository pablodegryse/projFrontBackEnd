import { Routes, RouterModule } from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {RankingsComponent} from "./rankings/rankings.component";
import {LobbyoverviewComponent} from "./lobby/lobbyoverview.component";
import {RoomComponent} from "./room/room.component";
import {CreateRoomComponent} from "./room/create-room.component";

const APP_ROUTES: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    {path:'roomlist', component:LobbyoverviewComponent},
    {path:'createroom', component:CreateRoomComponent},
    {path:'quickjoin', component:RoomComponent},
    {path: 'auth', component: AuthenticationComponent },
    {path:'rankings', component:RankingsComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);