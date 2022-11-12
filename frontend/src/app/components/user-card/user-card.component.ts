import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ContactModalPage } from '../contact-modal/contact-modal.page';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() result?: any;
  @Input() index?: any;
  @Input() total?: any;

  public profileImg;

  constructor(
    public sanitizer: DomSanitizer,
    private ModalController : ModalController
  ) { }

  ngOnInit() {
    console.log('mira:' , this.result.personal.filename)
  }

  async openContactModal(result){
    const modal = await this.ModalController.create({
       component: ContactModalPage,
       componentProps:{
        user: result
       }
     })
 
     await modal.present();
 

     
   }

}
