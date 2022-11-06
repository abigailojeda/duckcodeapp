import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StringDecoder } from 'string_decoder';

@Component({
  selector: 'app-tecno-modal',
  templateUrl: './tecno-modal.page.html',
  styleUrls: ['./tecno-modal.page.scss'],
})
export class TecnoModalPage implements OnInit {
  public tool:string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  saveTool(){
    this.modalCtrl.dismiss({
      "name" : this.tool
    })
  }
}
