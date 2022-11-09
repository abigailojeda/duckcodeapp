import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PhotouserService } from '../../../services/photouser.service';
import { UserService } from '../../../services/user.service';
import { Storage } from '@ionic/storage';
import { ProfesionalService } from '../../../services/profesional.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { TecnoModalPage } from '../tecno-modal/tecno-modal.page';
import { BenefitsModalPage } from '../benefits-modal/benefits-modal.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.page.html',
  styleUrls: ['./job-profile.page.scss'],
})
export class JobProfilePage implements OnInit {
  userEditionForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  public editMode: boolean = false;
  public userId: number;
  public user:any;
  public tecnologies:string[];
  public benefits:string[];
  public isNew:boolean = false;
  public bio = '';
  public category:boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private storage: Storage,
    private ProfesionalService : ProfesionalService,
    private modalCtrl:ModalController,
    private alertController: AlertController,
    private toastCtrl: ToastController
    
  ) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.capturedPhoto = "";
    this.userEditionForm = this.formBuilder.group({
      bio:['']
    });
    this.getUserId();
    }
  ionViewDidEnter(){
    this.getUserId();
  }
  getUserId(){
    let id:string;
    id = localStorage.getItem('currentId') as string
    this.userId = parseInt(id)

   // set actual profesional if exists:
    this.getProfesional(this.userId)
  }

  async getProfesional(id){
    let token = await this.storage.get("token");
    this.ProfesionalService.getProfesionalById(token,id ).subscribe((data) => {
      
     if(data[0]){
      this.user= data[0];
      console.log(this.isNew)

      //fill form with user info
      this.userEditionForm.setValue({
        bio: data[0]['bio'],
      });

      //fill tecnologies array
     this.tecnologies = data[0].tecnologies.split('/')

      //fill tecnologies array
      this.benefits = data[0].benefits.split('/')
     }else{
      
      this.isNew = true;
      this.user = 'empty';
      this.tecnologies = []
      this.benefits = []

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

  async openTecnoModal(){
   const modal = await this.modalCtrl.create({
      component: TecnoModalPage
    })

    await modal.present();

    const{data} = await modal.onDidDismiss();
   // console.log(data  )
    if(data?.name){
      this.tecnologies.push(data.name)
    }
  }
  async openBenefitsModal(){
   const modal = await this.modalCtrl.create({
      component: BenefitsModalPage
    })

    await modal.present();

    const{data} = await modal.onDidDismiss();
   // console.log(data  )
    if(data?.name){
      this.benefits.push(data.name)
    }
  }

  //modal to delete
  async presentAlert(item, section) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'secondary',
          handler: () => {
            console.log('cancel') 
          },
        },
        {
          text: 'OK',
          role: 'confirm',
           cssClass:'secondary',
          handler: () => {

            if (section === 'tecnologies'){
              this.tecnologies= this.tecnologies.filter(tecno =>{
                return tecno != item;
              })
            }

            if (section === 'benefits'){
              this.benefits= this.benefits.filter(tecno =>{
                return tecno != item;
              })
            }
           
          },
        },
      ],
    });

    await alert.present();
  }

  // update user profile
  async saveProfesionalData(){
   
    let tecnologiesString = '';
    let benefitsString = '';
    tecnologiesString = this.tecnologies.join('/');
    benefitsString = this.benefits.join('/');
    console.log(tecnologiesString,' | ' , benefitsString)
    console.log(this.userEditionForm.value)

    let profesionalUser ={
      bio:this.userEditionForm.value.bio,
      category:"neutra",
      tecnologies:tecnologiesString,
      benefits: benefitsString,
      isCompany:false,
    }

    let token = await this.storage.get("token");
    console.log(profesionalUser )
    console.log(token )
    this.ProfesionalService.updateProfesionalById(token, this.user.id, profesionalUser).subscribe(
      () => {
        //console.log(':)')
        this.presentToast('data have been saved')
      }
    );
  }

  //confirm user profile update
  
  async presentToast( message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position:  'bottom'
    });

    await toast.present();
  }

  setCategory(){
console.log("category: ", this.category)
  }
}
