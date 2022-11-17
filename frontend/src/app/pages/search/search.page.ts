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
      this.users=[]
    }
  
    ionViewDidEnter(){
      this.getAllUsers();
      this.users=[]
      
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
    this.users=[]
    let quantity;
    if(this.profiles.length > this.profesionals.length || this.profiles.length == this.profesionals.length){
      
      quantity = this.profiles.length
    
    }else{
      quantity = this.profesionals.length
      //to do: discard user that dont have both profesional & personal profile
    }

    for(let i = 0; i< quantity; i++){
      let user = {
        profesional : {},
        personal : {}
      }

      if(this.profesionals[i].userId == this.profiles[i]?.userId){
        user['profesional'] = this.profesionals[i];
        user['personal'] = this.profiles[i];
        console.log('user: ' , user)
        this.users.push(user)
       
      }
      //console.log('uyy', quantity)
    }
   
    //console.log('users: ', this.users)
  }

  
  handleChange(event) {
    this.setUsers()
    //console.log('guay')
    const query = event.target.value.toLowerCase();
    this.results = this.users.filter(d => d.profesional.tecnologies.split('/').includes(query));

  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  public showMenu(){
    this.menu.enable(true);
  }


}
