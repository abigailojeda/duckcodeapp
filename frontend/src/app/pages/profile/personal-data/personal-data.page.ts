import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhotouserService } from '../../../services/photouser.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
})
export class PersonalDataPage implements OnInit {
  userEdition: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(
    private photoService: PhotouserService,
  ) { }

  ngOnInit() {
    //this.userEdition.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
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
