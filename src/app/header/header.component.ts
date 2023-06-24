import { Component, OnInit,HostListener } from '@angular/core';
import { Router,NavigationEnd,NavigationStart } from '@angular/router';

import { AuthService} from '../services/auth.service';
import { FuneralService} from '../services/funeral.service';
import { ArabicNumsService} from '../services/arabic-nums.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  statistics:any={};
  statisticsDisplayStyle = "none";
  showMenu:boolean=false;
  showStatistics:boolean=false;

  constructor(public authService:AuthService,private router: Router,public funeralService: FuneralService,public arabicNums: ArabicNumsService) {
    router.events.subscribe((val) => {
      // see also 
      if(val instanceof NavigationStart){
        this.showMenu=false;
      } 
  });
  
}
   
  
  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {
    this.showMenu=false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event:any) {
    if(this.showMenu==true){
      this.showMenu=false;
    }
  }

  mobileMenuClick(e:any){
    e.stopPropagation();
    this.showMenu=!this.showMenu;
  }

  logout(e:any){
    this.showMenu=false;
    this.authService.logout().subscribe({
      next:(data:any)=>{
        this.authService.isAuth=false;
       this.router.navigate(['/']);
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }

  openStatisticsPopup() {
    this.showMenu=false;
    this.funeralService.getStatistics().subscribe({
      next:(data:any)=>{
       console.log(data);
       this.statistics=data;
       this.statisticsDisplayStyle = "block";
       this.showStatistics=true;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
    
  }
  closeStatisticsPopup() {
    this.statisticsDisplayStyle = "none";
    this.showStatistics=false;
  }

}
