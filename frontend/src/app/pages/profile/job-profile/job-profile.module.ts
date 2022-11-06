import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobProfilePageRoutingModule } from './job-profile-routing.module';

import { JobProfilePage } from './job-profile.page';
import { TecnoModalPage } from '../tecno-modal/tecno-modal.page';
import { TecnoModalPageModule } from '../tecno-modal/tecno-modal.module';

@NgModule({
  entryComponents: [
    TecnoModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobProfilePageRoutingModule,
    ReactiveFormsModule,
    TecnoModalPageModule
  ],
  declarations: [JobProfilePage]
})
export class JobProfilePageModule {}
