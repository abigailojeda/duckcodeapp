import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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

  createProfile(token,id, profile, blob){
    let myOptions = this.getOptions(token);
    let formData = new FormData();
    formData.append("userId", id);
    formData.append("name", profile.name);
    formData.append("city", profile.city);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("file", blob);
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/profiles`,formData, myOptions);
  }

  getProfiles(token) {
    let myOptions = this.getOptions(token);
    //console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/profiles`, myOptions);
  }
  getProfileById(token,id) {
    let myOptions = this.getOptions(token);
    //console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/profiles/user/${id}`, myOptions);
  }

  updateProfileById(token, userId, id, profile, blob){
    console.log('esto hay aqui:', profile, 'userID: ', userId, ' id: ', id, 'blob: ', blob)
    let myOptions = this.getOptions(token);
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", profile.name);
    formData.append("city", profile.city);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("file", blob);

    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/api/profiles/${id}`,formData,myOptions);
  }


  deleteProfileByID(token, id) {
    let myOptions = this.getOptions(token);
    console.log('a borrar: ' , id)
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/api/profiles/${id}`, myOptions);
  }
}
