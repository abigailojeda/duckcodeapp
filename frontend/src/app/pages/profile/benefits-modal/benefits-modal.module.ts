import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BenefitsModalPageRoutingModule } from './benefits-modal-routing.module';

import { BenefitsModalPage } from './benefits-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BenefitsModalPageRoutingModule
  ],
  declarations: [BenefitsModalPage]
})
export class BenefitsModalPageModule {}
