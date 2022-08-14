import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users-service.service';
import { GlobalVars } from '../globalvars';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  isLoggedIn: boolean = GlobalVars.isLoggedIn;
  mongoID: string = GlobalVars.mongoID;
  username: string = GlobalVars.username;
  password: string = GlobalVars.password;
  score: number = GlobalVars.score;

  usernameInput: string;
  oldpasswordInput: string;
  newpasswordInput: string;

  displayUsertaken: boolean = false;
  displayWrongPassword: boolean = false;
  displaySamePasswordInvalid: boolean = false;
  displayInvalidFields: boolean = false;

  userService: UsersService;

  constructor(private http: HttpClient, private router: Router) {
    this.userService = new UsersService(this.http);
  }
   
  ngOnInit(): void {
    this.oldpasswordInput = "";
  }

  async onClickedUpdate(){
    if (this.newpasswordInput != null && this.oldpasswordInput != null) {
      if (this.newpasswordInput != this.oldpasswordInput) {
        if (this.oldpasswordInput == GlobalVars.password) {
          await this.updateAccount(this.usernameInput, this.newpasswordInput);
        } else {
          this.displayWrongPassword = true;
        }
      } else {
        this.displaySamePasswordInvalid = true;
      }
    }

    if (this.usernameInput != GlobalVars.username) {
      if (this.oldpasswordInput == GlobalVars.password) {
        await (await this.userService.getUserByUsernameAsync(this.usernameInput)).subscribe(data => {
          console.log(data);
          for (let index = 0; index < data.length; index++) {
            const user = data[index];
            
            if (user._id != GlobalVars.mongoID) {
              this.displayUsertaken = true;
              return;
            }
          }

          this.updateAccount(this.usernameInput, this.oldpasswordInput);
        });
      } else {
        this.displayWrongPassword = true;
      }
    }
  }

  async updateAccount(username: string, password: string) {
    await this.userService.updateUserAsync(GlobalVars.mongoID, username, password).then(() => {
      GlobalVars.username = username;
      GlobalVars.password = password
      this.router.navigate(['']);
    });
  }

  onClickedLogOut(){
    GlobalVars.isLoggedIn = false;
    GlobalVars.mongoID = "";
    GlobalVars.username = "";
    GlobalVars.password = "";
    GlobalVars.score = 0;
    this.router.navigate(['']);
  }

  async onClickedDeleteAccount(){
    await this.userService.getUserByIDAsync(GlobalVars.mongoID).then(user => {
      console.log(user);
    });

    await this.userService.deleteUserAsync(GlobalVars.mongoID).then(() => {
      this.onClickedLogOut();
    })
  }
}
