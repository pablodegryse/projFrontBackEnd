//this is the entry point to the application , we add our components here
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';
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
import {LobbyoverviewComponent} from "./components/lobby/lobbyoverview.component";
import {CreateRoomComponent} from "./components/room/create-room.component";
import {RoomItemComponent} from "./components/room/room-item.component";

import {AuthService} from "./services/auth.service";
import {HttpModule} from "@angular/http";
import {RoomService} from "./services/room.service";

import {CanvasComponent} from "./components/game/canvas.component";
import {QueueComponent} from "./components/game/queue.component";
import {GameComponent} from "./components/game/game.component";
import {RoomComponent} from "./components/room/room.component";
import {ChatComponent} from "./components/chat/chat.component";
import {WordComponent} from "./components/word/word.component";
import {RoomLobbyComponent} from "./components/room/room-lobby.component";
import {ChatService} from "./services/chat.service";


@NgModule({
    imports:[
        BrowserModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations:[
        AppComponent,
        CanvasComponent,
        QueueComponent,
        GameComponent,
        HomeComponent,
        DropdownDirective,
        HeaderComponent,
        AuthenticationComponent,
        RegisterComponent,
        SigninComponent,
        LogoutComponent,
        RankingsComponent,
        LobbyoverviewComponent,
        CreateRoomComponent,
        RoomItemComponent,
        ChatComponent,
        RoomComponent,
        WordComponent,
        RoomLobbyComponent
    ],
    providers:[AuthService, RoomService, ChatService],
    bootstrap:[AppComponent]
})

export class AppModule{
}