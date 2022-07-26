import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  notifyNewKing: boolean = false;
  notifyOvertake: boolean = false;
  darkTheme: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}