import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PhotouserService } from '../../../services/photouser.service';
import { UserService } from '../../../services/user.service';
import { ProfileService } from '../../../services/profile.service';
import { Storage } from '@ionic/storage';

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

  constructor(
    private photoService: PhotouserService,
    private UserService : UserService,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private ProfileService : ProfileService
  ) { }

  ngOnInit() {
    //this.userEdition.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
    this.userEditionForm = this.formBuilder.group({
      name: [''],
    });
    this.getUserId();
    // this.userEdition.setValue({

    // })
  }

  getUserId(){
    let id:string;
    id = localStorage.getItem('currentId') as string
    this.userId = parseInt(id)

   // set actual profile if exits:
    this.getProfile(this.userId)
  }

  async getProfile(id){
    let token = await this.storage.get("token");
    this.ProfileService.getProfileById(token,2 ).subscribe((data) => {
     if(data[0]){
      this.user= data;
     }else{
      this.user = '';
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
      this.capturedPhoto = data.webPath;
    });
 }

 pickImage() {
    this.photoService.pickImage().then(data => {
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
    // if (!this.bicycleForm.valid) {
    //   console.log('Please provide all the required values!')
    //   return false;
    // } else {
    //   let blob = null;
    //   if (this.capturedPhoto != "") {
    //     const response = await fetch(this.capturedPhoto);
    //     blob = await response.blob();
    //   }
 
    //   this.bicycleService.createBicycle(this.bicycleForm.value, blob).subscribe(data => {
    //     console.log("Photo sent!");
    //     this.router.navigateByUrl("/list-bicycles");
    //   })
    // }
   }

}
