import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MotorbikeService } from '../../services/motorbike.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public userStorage: any;
  public results:any = [];
  
  menuType: string = 'overlay';

  public users:any =[];
  public userItem = {
    personal : {},
    job : {}
  }

  
  constructor(private authService: AuthService,
    private router: Router,
    private motorbikeService: MotorbikeService,
    private storage: Storage,
    private UserService: UserService,
    private menu: MenuController,
    private ProfileService : ProfileService
    
    ) { }

    ngOnInit() {
      this.getAllUsers();
      this.userStorage = this.UserService.userStorage;
      this.showMenu()
    }
  
    ionViewDidEnter(){
      this.getAllUsers();
    }
  async getAllUsers() {

   let personal;
   let job;



    let token = await this.storage.get("token");
    this.ProfileService.getProfiles(token).subscribe(res => {
      console.log("User Logged in. This is the motorbike list:");
       console.log(res);
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
      this.users[index] = item;
    })

   this.results =  this.users
  }

  
  handleChange(event) {
    console.log('guay')
    // const query = event.target.value.toLowerCase();
    // this.results = this.users.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  public showMenu(){
    this.menu.enable(true);
  }


}
