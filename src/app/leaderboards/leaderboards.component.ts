import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css'],
  styles: [`
    .firstPlace {
      color: #ffcb5c;
      font-weight: bold;
      font-size: 20px;
    }
    
    .secondPlace {
      color: #ffcb5c;
      font-weight: bold;
      font-size: 18px;
    }
    
    .thirdPlace {
      color: #ffcb5c;
      font-weight: bold;
      font-size: 16px;
    }

    :host ::ng-deep .row-accessories {
      background-color: rgba(0,0,0,.15) !important;
    }
  `]
})
export class LeaderboardsComponent implements OnInit {
  loaded: boolean = false;
  usersService: UsersService;
  sortedUserScores: any[];

  constructor(private http: HttpClient) {
    console.log("Started");
    this.usersService = new UsersService(http);
  }
  
  ngOnInit(): void {
    this.displaySortedScoresAsync();
  }
  
  async displaySortedScoresAsync() {
    this.loaded = false;
    var users = await this.usersService.getUsersAsync();
    this.sortedUserScores = users.sort((a, b) => b.score - a.score);
    this.loaded = true;
    console.log("Completed");
    return this.sortedUserScores;
  }

  reloadScores(){
    console.log("Reloading scores");
    this.loaded = false;
    this.sortedUserScores = new Array();
    this.displaySortedScoresAsync();
  }
}
