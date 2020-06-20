import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from "./users/register/registration.component";
import {LoginComponent} from "./users/login/login.component";
import {ProfileComponent} from "./users/profile/profile.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {DraughtsComponent} from "./game/Draughts.component";


const routes: Routes = [
  {path: 'signup', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'play', component: DraughtsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
