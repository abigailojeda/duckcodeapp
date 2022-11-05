import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../auth/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userStorage: any = {
    currentUser: {},
    disabledUser: false,
  };


  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { 
    if (localStorage.getItem('currentUser')) {
      this.userStorage.currentUser = JSON.parse(
        localStorage.getItem('currentUser') as string
      );
    }
  }

  private getOptions(token){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  getUsers(token) {
    let myOptions = this.getOptions(token);
    //console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions);


    // return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions).pipe(
    //   tap(function (res) {
    //       console.log(res);
    //     })
    // );
  }

  setCurrentUser(user: any) {
    this.userStorage.currentUser = user;
  }
}
