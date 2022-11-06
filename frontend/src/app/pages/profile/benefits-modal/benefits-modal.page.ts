import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-benefits-modal',
  templateUrl: './benefits-modal.page.html',
  styleUrls: ['./benefits-modal.page.scss'],
})
export class BenefitsModalPage implements OnInit {
  public benefit:string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  saveTool(){
    this.modalCtrl.dismiss({
      "name" : this.benefit
    })
  }

}
