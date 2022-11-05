import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MotorbikeService } from '../../services/motorbike.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public userStorage: any;
  public results:any = [];
  public users:any =[];
  menuType: string = 'overlay';

  
  constructor(private authService: AuthService,
    private router: Router,
    private motorbikeService: MotorbikeService,
    private storage: Storage,
    private UserService: UserService,
    private menu: MenuController) { }

    ngOnInit() {
      this.getAllUsers();
      this.userStorage = this.UserService.userStorage;
      localStorage.setItem('visibleOn', 'search')
      this.showMenu()
    }
  
    ionViewDidEnter(){
      this.getAllUsers();
      localStorage.setItem('visibleOn', 'search')
    }
  async getAllUsers() {
    let token = await this.storage.get("token");
    this.UserService.getUsers(token).subscribe(res => {
      // console.log("User Logged in. This is the motorbike list:");
      // console.log(res);
      if(res){
        this.setUsers(res);
      }
    }, error => {
      // console.log(error);
      // console.log("User not authenticated. Please log in");
      this.router.navigateByUrl("/login");
    });
  }

  setUsers(res){
    res.map((item , index) =>{
      this.users[index] = item.username;
    })

   this.results =  this.users
  }

  
  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.users.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  public showMenu(){
    this.menu.enable(true);
  }


}
