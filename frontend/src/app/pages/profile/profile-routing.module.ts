import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children:[
      {
        path: 'personal',
        loadChildren: () => import('./personal-data/personal-data.module').then( m => m.PersonalDataPageModule),
      },
      {
        path: 'job',
        loadChildren: () => import('./job-profile/job-profile.module').then( m => m.JobProfilePageModule),
      }
      
    ]
  },
  {
    path: 'personal-data',
    loadChildren: () => import('./personal-data/personal-data.module').then( m => m.PersonalDataPageModule)
  },
  {
    path: 'job-profile',
    loadChildren: () => import('./job-profile/job-profile.module').then( m => m.JobProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
