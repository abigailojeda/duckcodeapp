import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.page.html',
  styleUrls: ['./contact-modal.page.scss'],
})
export class ContactModalPage implements OnInit {
  @Input() user;

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }


}
