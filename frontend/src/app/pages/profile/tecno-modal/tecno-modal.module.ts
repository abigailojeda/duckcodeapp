import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TecnoModalPageRoutingModule } from './tecno-modal-routing.module';

import { TecnoModalPage } from './tecno-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TecnoModalPageRoutingModule
  ],
  declarations: [TecnoModalPage]
})
export class TecnoModalPageModule {}
