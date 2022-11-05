import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss'],
})
export class MenuProfileComponent implements OnInit {
  public userStorage: any;
  menuType: string = 'overlay';
  constructor(
    private router: Router,
    private UserService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userStorage = this.UserService.userStorage;

  }

  getUserName(){
    let username;
    username=this.userStorage.currentUser.username;
    console.log('username:',username)
    return username;
  }

  logout() {
    this.authService.logout().then(() => {

      this.router.navigateByUrl("/login");
    });
  }
}
