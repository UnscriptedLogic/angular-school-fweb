import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users-service.service';
import { GlobalVars } from '../globalvars';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  userService: UsersService;

  displayLoading: boolean = false;
  displayUsertaken: boolean = false;

  username: string;
  password: string;

  ngOnInit(): void {
    this.userService = new UsersService(this.http);
    this.displayLoading = false;
  }

  async onClickedSignup() {
    this.displayLoading = true;
    console.log(this.username)
    await (await this.userService.getUserByUsernameAsync(this.username)).subscribe(data => {
      if (data.length > 0) {
        // User already exists
        this.displayLoading = false;
        this.displayUsertaken = true;
        console.log(data[0].password);
        return;
      }
      else {
        this.signUp();
      }
    });
  }

  async signUp(){
    await (await this.userService.createUserAsync(this.username, this.password)).subscribe(data => {
      console.log("Signing Up");
      GlobalVars.isLoggedIn = true;
      GlobalVars.mongoID = data["insertedId"];
      GlobalVars.username = this.username;
      GlobalVars.password = this.password;
      this.router.navigate(['']);
      console.log(GlobalVars.mongoID);
    });
  }
}
