import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

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
        label: 'Settings', icon: 'pi pi-fw pi-cog', 
        routerLink: ['/settings'],
      },
      {
        label: 'About', icon: 'pi pi-fw pi-info-circle', 
        routerLink: ['/about'],
        
      }
    ]
  }

}
