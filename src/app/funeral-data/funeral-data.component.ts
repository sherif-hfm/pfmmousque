import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray,FormBuilder,Validators, ValidationErrors  } from '@angular/forms';

import { FuneralService} from '../services/funeral.service';
import { ArabicNumsService} from '../services/arabic-nums.service';
import { UmalquraCalendarService} from '../services/umalqura-calendar.service';
import { AuthService} from '../services/auth.service';
import { DictionaryService} from '../services/dictionary.service';

@Component({
  selector: 'app-funeral-data',
  templateUrl: './funeral-data.component.html',
  styleUrls: ['./funeral-data.component.css']
})
export class FuneralDataComponent implements OnInit {
  mode:string='view'; // view || edit || add
  funeralList:any[]=[];
  prayers:any[]=[];
  sexs:any[]=[];
  Places:any[]=[];
  funeralFrom = this.fb.group({
    id:new FormControl('',Validators.required),
    deadName:new FormControl('',Validators.required),
    date:new FormControl('',Validators.required),
    prayerId:new FormControl('',Validators.required),
    sex:new FormControl('',Validators.required),
    placeId:new FormControl('',Validators.required),
  });
  searchDate:string='';

  constructor(public funeralService: FuneralService,public arabicNums: ArabicNumsService,public umalquraCalendar:UmalquraCalendarService,public authService:AuthService,private fb: FormBuilder,public dictionary:DictionaryService) { }

  ngOnInit(): void {
    this.loadlookups();
    this.searchDate=this.getCurrentDate();
    this.search();
  }

  loadlookups(){
    this.getPrayers();
    this.getSexs();
    this.getPlace();
  }

  getPrayers(){
    this.funeralService.getPrayers().subscribe({
      next:(data:any)=>{
       console.log(data);
       this.prayers=data;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }

  getSexs(){
    this.funeralService.getSexs().subscribe({
      next:(data:any)=>{
       console.log(data);
       this.sexs=data;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }

  getPlace(){
    this.funeralService.getPlace().subscribe({
      next:(data:any)=>{
       console.log(data);
       this.Places=data;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }

  toArabicNum(num:string){
    return this.arabicNums.toArabicNum(num);
  }

  getCurrentDate(){
    const crDate=new Date();
    return crDate.getFullYear() + '-' + (crDate.getMonth() + 1)+ '-' +crDate.getDate();
  }

  getFuneralDetails(){
    this.funeralService.getDetails(this.searchDate).subscribe({
      next:(data:any)=>{
       console.log(data);
       this.funeralList=data;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }
  

search(){
  this.getFuneralDetails();
}
  add(){
    this.mode='add';
    this.funeralFrom.get('id')?.setValue(0);
    this.funeralFrom.get('date')?.setValue(this.getCurrentDate());
    this.funeralFrom.get('deadName')?.setValue('');
    }

  edit(id:any){
    this.funeralService.getDetail(id).subscribe({
      next:(data:any)=>{
       console.log(data);
       this.funeralFrom.get('id')?.setValue(data.id);
       this.funeralFrom.get('date')?.setValue(data.date);
       this.funeralFrom.get('sex')?.setValue(data.sexId);
       this.funeralFrom.get('deadName')?.setValue(data.deadName);
       this.funeralFrom.get('prayerId')?.setValue(data.prayerId);
       this.funeralFrom.get('placeId')?.setValue(data.purialplaceId);
       this.mode='edit';
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  
  }

  save(){
    console.log('save');
    console.log(this.funeralFrom)
    if(this.funeralFrom.status==='INVALID'){
      return;
    }
    if(this.mode=='add')
      this.saveNew();
    else
      this.saveEdit();
  }

  saveNew(){
      const funeral={
      deadName:this.funeralFrom.get('deadName')?.value,
      date:this.funeralFrom.get('date')?.value,
      sex:this.funeralFrom.get('sex')?.value,
      prayerId:this.funeralFrom.get('prayerId')?.value,
      placeId:this.funeralFrom.get('placeId')?.value,
    };
    this.funeralService.addFuneral(funeral).subscribe({
      next:(data:any)=>{
       console.log(data);
       this.mode='view';
       this.search();
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }

  saveEdit(){
    console.log('saveEdit');
    const funeral={
      id:this.funeralFrom.get('id')?.value,
      deadName:this.funeralFrom.get('deadName')?.value,
      date:this.funeralFrom.get('date')?.value,
      sex:this.funeralFrom.get('sex')?.value,
      prayerId:this.funeralFrom.get('prayerId')?.value,
      placeId:this.funeralFrom.get('placeId')?.value,
    };
    console.log(funeral);
    this.funeralService.updateFuneral(funeral).subscribe({
      next:(data:any)=>{
       console.log(data);
       this.mode='view';
       this.search();
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }

  delete(id:any){
    this.funeralService.deleteFuneral(id).subscribe({
      next:(data:any)=>{
        this.mode='view';
        this.search();
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }

  exit(){
    this.mode='view';
  }

}
