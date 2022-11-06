import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

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

  getProfesionals(token) {
    let myOptions = this.getOptions(token);
    //console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/profesionals`, myOptions);
  }
  getProfesionalById(token,id) {
    let myOptions = this.getOptions(token);
    //console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/profesionals/user/${id}`, myOptions);
  }
  updateProfesionalById(token, id, profesional){
    let myOptions = this.getOptions(token);

    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/api/profesionals/${id}`,profesional,myOptions);
  }
}
