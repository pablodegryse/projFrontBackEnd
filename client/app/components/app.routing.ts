import { Routes, RouterModule } from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {RankingsComponent} from "./rankings/rankings.component";
import {LobbyoverviewComponent} from "./lobby/lobbyoverview.component";
import {CreateRoomComponent} from "./room/create-room.component";
import {GameComponent} from "./game/game.component"
import {RoomComponent} from "./room/room.component";
import {UserProfileComponent} from "./user/user-profile.component";

const APP_ROUTES: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    {path:'roomlist', component:LobbyoverviewComponent},
    {path:'createroom', component:CreateRoomComponent},
    {path:'room', component:RoomComponent},
    {path:'quickjoin', component:GameComponent},
    {path: 'auth', component: AuthenticationComponent },
    {path:'rankings', component:RankingsComponent},
    {path:'user', component:UserProfileComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);