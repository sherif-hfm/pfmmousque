import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class FuneralService {

  constructor(public http: HttpClient,public settings: SettingsService) {
    
   }

   getTodayFuneral(){
    console.log('getTodayFuneral');
    return this.http.get( this.settings.ApiBaseUrl +  '/funeral' ,{observe:'body',responseType:'json'});
  }
  getStatistics(){
    console.log('getStatistics');
    return this.http.get( this.settings.ApiBaseUrl +  '/funeral/statistics' ,{observe:'body',responseType:'json'});
  }

  getDetails(date: any){
    console.log('getDetails');
    return this.http.get( this.settings.ApiBaseUrl +  '/funeral/getDetails/' +date  ,{observe:'body',responseType:'json'});
  }

  getDetail(id: any){
    console.log('getDetail');
    return this.http.get( this.settings.ApiBaseUrl +  '/funeral/getDetail/' + id  ,{observe:'body',responseType:'json'});
  }

  getDayDetail(id: any,date:any){
    console.log('getDayDetail');
    return this.http.get( this.settings.ApiBaseUrl +  `/funeral/getDayDetail/${date}/${id}`,{observe:'body',responseType:'json'});
  }

  getPrayers(){
    console.log('getPrayers');
    return this.http.get( this.settings.ApiBaseUrl +  '/funeral/prayers',{observe:'body',responseType:'json'});
  }

  getSexs(){
    console.log('getSexs');
    return this.http.get( this.settings.ApiBaseUrl +  '/funeral/sexs',{observe:'body',responseType:'json'});
  }

  getPlace(){
    console.log('getPlace');
    return this.http.get( this.settings.ApiBaseUrl +  '/funeral/places',{observe:'body',responseType:'json'});
  }

  addFuneral(funeral: any){
    console.log('addFuneral');
    return this.http.post(this.settings.ApiBaseUrl + '/funeral/add',funeral);
  }

  updateFuneral(funeral: any){
    console.log('updateFuneral');
    return this.http.post(this.settings.ApiBaseUrl + '/funeral/update',funeral);
  }
  deleteFuneral(id: any){
    console.log('deleteFuneral');
    return this.http.delete(this.settings.ApiBaseUrl + '/funeral/del/' + id );
  }
}
