import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PhotouserService } from '../../../services/photouser.service';
import { UserService } from '../../../services/user.service';
import { ProfileService } from '../../../services/profile.service';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
})


export class PersonalDataPage implements OnInit {
  userEditionForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  public editMode: boolean = false;
  public userId: number;
  public user:any;
  public isNew:boolean = false;

  constructor(
    private photoService: PhotouserService,
    private UserService : UserService,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private ProfileService : ProfileService,
    public sanitizer: DomSanitizer
    
  ) { }

  ngOnInit() {
    //this.userEdition.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
    this.userEditionForm = this.formBuilder.group({
      name: [''],
      city: [''],
      email: [''],
      phone: [''],
      // image: [''],
    });
    this.getUserId();
    // this.userEdition.setValue({

    // })
  }

  ionViewDidEnter(){
    this.getUserId();
  }

  getUserId(){
    let id:string;
    id = localStorage.getItem('currentId') as string
    this.userId = parseInt(id)

   // set actual profile if exists:
    this.getProfile(this.userId)
  }

  async getProfile(id){
    let token = await this.storage.get("token");
    this.ProfileService.getProfileById(token,id ).subscribe((data) => {

     if(data[0]){
      this.user= data[0];
      console.log(this.isNew)
      console.log(this.user)

      
      //fill form with user info
      this.userEditionForm.setValue({
        name: data[0]['name'],
        city:  data[0]['city'],
        email: data[0]['email'],
        phone: data[0]['phone'],
        // image: data[0]['image'],
      });

     }else{

      this.user = '';
      this.isNew = true;
      console.log(this.user)
      console.log(this.isNew)
     }
    });
    // this.UserService.getUserById(id).subscribe((data) => {
    //   this.user = data;
    //   this.userEditionForm.setValue({
    //     name: data['username'],
    //   });
    // });
  }
  takePhoto() {
    this.photoService.takePhoto().then(data => {
      console.log(data)
      this.capturedPhoto = data.webPath;
      console.log(this.capturedPhoto)
    });
 }

 pickImage() {
    this.photoService.pickImage().then(data => {
      console.log(data)
      this.capturedPhoto = data.webPath;
    });
 }

 discardImage() {

   this.capturedPhoto = null;
 }

 onSubmit(){
  console.log(this.userEditionForm.value)
 }
  async saveUserEdition() {
    
    this.isSubmitted = true;
   
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
        console.log('blob:', blob)
      }

      //Slet token = await this.storage.get("token");
 
      this.ProfileService.createProfile(this.userId,this.userEditionForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
      })
    
   }

}
