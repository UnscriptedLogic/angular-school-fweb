import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { primengModule } from 'src/primeng.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GameComponent } from './game/game.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    primengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
