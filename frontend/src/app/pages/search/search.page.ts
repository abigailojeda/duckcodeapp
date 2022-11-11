import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';
import { ProfesionalService } from '../../services/profesional.service';

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
  public profiles:any;
  public profesionals:any;
 

  
  constructor(private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private UserService: UserService,
    private menu: MenuController,
    private ProfileService : ProfileService,
    private ProfesionalService : ProfesionalService
    
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

  //  let personal;
  //  let job;


    let token = await this.storage.get("token");

    //get personal data user's profiles
    this.ProfileService.getProfiles(token).subscribe(res => {
       //console.log(res);
      if(res){
        //this.setUsers(profiles);
        this.profiles = res;
        console.log('profiles: ', this.profiles )
      }
    }, error => {
      // console.log(error);
      // console.log("User not authenticated. Please log in");
      this.router.navigateByUrl("/login");
    });


    //get job data user's profiles
    this.ProfesionalService.getProfesionals(token).subscribe(res => {
      //console.log(res);
     if(res){
       //this.setUsers(profiles);
       this.profesionals = res;
       console.log('profesionals: ', this.profesionals )
     }
    });


   
  }

  setUsers(){

    for(let i = 0; i< this.profiles.length; i++){

    }

    console.log('llega a users: ',this.profiles, ' / ', this.profesionals)




  //   let userItem = {
  //     personal : {},
  //     job : {}
  //   }
  //   res.map((item , index) =>{
  //     // this.users[index] = item;
  //     //console.log(item)

  //     userItem.personal = item;
  //     this.users.push(userItem);
  //   })

  //   console.log('los usuarios son: ',this.users)
  //  this.results =  this.users
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
