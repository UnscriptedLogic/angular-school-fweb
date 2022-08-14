import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { GlobalVars } from '../globalvars';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  username: string;
  isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = GlobalVars.isLoggedIn;
    this.username = GlobalVars.username;
   }

  ngOnInit(): void {
    
    this.items = [
      {
        label: 'Home', icon: 'pi pi-fw pi-home', 
        routerLink: ['/'],
      },
      {
        label: 'Leader Boards', icon: 'pi pi-fw pi-server', 
        routerLink: ['/leaderboards'],
      },
      {
        label: 'Account', icon: 'pi pi-user', 
        routerLink: ['/account'],
      },
      {
        label: 'Settings', icon: 'pi pi-fw pi-cog', 
        routerLink: ['/settings'],
      },
    ]
  }

}
