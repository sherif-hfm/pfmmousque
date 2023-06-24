import { Component, OnInit } from '@angular/core';

import { FuneralService} from '../services/funeral.service';
import { ArabicNumsService} from '../services/arabic-nums.service';
import { UmalquraCalendarService} from '../services/umalqura-calendar.service';
import { DictionaryService} from '../services/dictionary.service';

@Component({
  selector: 'funeral-list',
  templateUrl: './funeral-list.component.html',
  styleUrls: ['./funeral-list.component.css']
})
export class FuneralListComponent implements OnInit {
  
  funeralList:any=[];
  funeralDetails:any=[];
    showdetails:boolean=false;
  prayerTodayTotal:any=0;

  
  
  constructor(public funeralService: FuneralService,public arabicNums: ArabicNumsService,public umalquraCalendar:UmalquraCalendarService,public dictionary:DictionaryService) {
    console.log(umalquraCalendar.gregorianToUmAlQura(new Date()));
   }
  
  ngOnInit(): void {
    //console.log(this.arabicNums.toArabicNum('123')) ;
    this.getTodayFuneral();
   
  }

  getCurrentDate(){
    const crDate=new Date();
    return crDate.getFullYear() + '-' + (crDate.getMonth() + 1)+ '-' +crDate.getDate();
  }

  getCurrentDateV2(){
    const crDate=new Date();
    return crDate.getFullYear() + '/' + (crDate.getMonth() + 1)+ '/' +crDate.getDate();
  }

  toArabicNum(num:string){
    return this.arabicNums.toArabicNum(num);
  }

  getTodayFuneral(){
    this.funeralService.getTodayFuneral().subscribe({
      next:(data:any)=>{
       console.log(data);
       this.prayerTodayTotal = data.reduce((partialSum:any, p:any) => partialSum + p.Total, 0);
       this.funeralList=data;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
       
      }
    });
  }

  openDetailsPopup(id:any) {

    this.funeralService.getDayDetail(id,this.getCurrentDate()).subscribe({
      next:(data:any)=>{
       console.log(data);
       this.funeralDetails=data;       
       this.showdetails=true;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
    
  }
 

  

}
