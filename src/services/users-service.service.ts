import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:4201/api/";
  
  constructor(private http: HttpClient) { }

  async getUsersAsync() {
    var users = [];
    await fetch(this.url + "users").then(res => {
      return res.json();
    }).then(json => {
      users = json;
      return json;
    });

    return users;
  }

  async createUserAsync(username: string, password: string) {
    return await this.http.post<any[]>(this.url + "createUser", { username: username, password: password, score: 0, userType: "Normal" });
  }

  async createAdminAsync(username: string, password: string) {
    return await this.http.post<any[]>(this.url + "createUser", { username: username, password: password, score: 0, userType: "Admin" });
  }

  async getUserByUsernameAsync(_username: string) {
    return await this.http.get<any[]>(`${this.url}findUserByUsername/${_username}`);
  }

  async getUserByIDAsync(id: string) {
    var user;
    await fetch(`${this.url}findUserByID/${id}`).then(res => {
      return res.json();
    }).then(json => {
      user = json;
      return json;
    });

    return user;
  }

  async updateUserScoreAsync(id: string, score: number) {
    console.log(JSON.stringify({ score: score }));
    return await fetch(`${this.url}updateUserScore/${id}`, { 
      method: 'PUT',   
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ score: score }) 
    });
  }

  async updateUserAsync(id: string, username: string, password: string) {
    return await fetch(`${this.url}updateUser/${id}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ username: username, password: password })
    });
  }

  async deleteUserAsync(id: string) {
    return await fetch(`${this.url}deleteUser/${id}`, { method: 'DELETE' });
  }
}
