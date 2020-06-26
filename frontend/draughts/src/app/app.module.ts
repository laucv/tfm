import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RegistrationComponent} from "./users/register/registration.component";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "./header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserListComponent} from "./users/user-list/user-list.component";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {LoginComponent} from "./users/login/login.component";
import {ProfileComponent} from "./users/profile/profile.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {BoardComponent} from "./game/views/views/board.component";
import {SquareComponent} from './game/views/views/square.component';
import {DraughtComponent} from './game/views/views/pieces/draught.component';
import {PawnComponent} from './game/views/views/pieces/pawn.component';
import {DraughtsService} from './game/draughts.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    UserListComponent,
    LoginComponent,
    ProfileComponent,
    WelcomeComponent,
    BoardComponent,
    SquareComponent,
    DraughtComponent,
    PawnComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        HttpClientModule,
        MatMenuModule,
        MatIconModule
    ],
  providers: [
    UserService,
    DraughtsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
