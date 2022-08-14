import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { primengModule } from 'src/primeng.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GameComponent } from './game/game.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GameComponent,
    NavbarComponent,
    SettingsComponent,
    AboutComponent,
    LeaderboardsComponent,
    SignupComponent,
    AccountComponent,
    LoginComponent,
    LocationsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    primengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
