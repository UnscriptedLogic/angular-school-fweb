import { Component, OnInit } from '@angular/core';
import { GlobalVars } from '../globalvars';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  isLoggedIn: boolean;
  gameDuration: number;
  userType: string;

  ngOnInit(): void {
    this.isLoggedIn = GlobalVars.isLoggedIn;
    this.gameDuration = GlobalVars.gameDuration;
    this.userType = GlobalVars.userType;
  }

  onClickedPlay() {
    
  }
}
