import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users-service.service';
import { GlobalVars } from '../globalvars';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  userService: UsersService;

  displayLoading: boolean = false;
  displayWrongPassword: boolean = false;
  displayNoUser: boolean = false;

  username: string;
  password: string;

  ngOnInit(): void {
    this.userService = new UsersService(this.http);
    this.displayLoading = false;
  }

  async onClickedLogIn() {
    this.displayLoading = true;
    await (await this.userService.getUserByUsernameAsync(this.username)).subscribe(data => {
      this.displayLoading = false;
      if (data.length > 0) {
        if (data[0].password == this.password) {
          GlobalVars.isLoggedIn = true;
          GlobalVars.mongoID = data[0]._id;
          GlobalVars.username = this.username;
          GlobalVars.password = this.password;
          GlobalVars.score = data[0].score;
          GlobalVars.userType = data[0].userType;
          this.router.navigate(['']);
        } else {
          this.displayWrongPassword = true;
        }
      } else {
        this.displayNoUser = true;
      }
    });
  }
}
