import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { UserCardComponent } from './user-card/user-card.component';
import { RouterModule } from '@angular/router';
import { MenuProfileComponent } from './menu-profile/menu-profile.component';



@NgModule({
  declarations: [
    MenuComponent,
    UserCardComponent,
    MenuProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[
    MenuComponent,
    UserCardComponent,
    MenuProfileComponent
  ]
})
export class ComponentsModule { }
