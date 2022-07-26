import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from 'src/models/users.json';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  async sleep() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  async getUsersAsync() {
    await this.sleep();
    return User;
  }

  getUsers() {
    return User;
  }
}
