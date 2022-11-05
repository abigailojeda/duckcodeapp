import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public userStorage: any;
  public menuOptions:any;
  public visible:String = 'search';
  menuType: string = 'overlay';
  constructor(
    private router: Router,
    private UserService: UserService,
    private authService: AuthService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.userStorage = this.UserService.userStorage;
    this.menuOptions = [
      {
        icon:'search-outline',
        value:'Search',
        path:'/search',
      },
      {
        icon:'person-outline',
        value:'Edit Profile',
        path:'/profile/personal',
      },
    ]
  }


  getUserName(){
    let username;
    username=this.userStorage.currentUser.username;
    //console.log('username:',username)
    return username;
  }

  logout() {
    this.authService.logout().then(() => {
      this.menu.enable(false);
      this.router.navigateByUrl("/login");
    });
  }

}
