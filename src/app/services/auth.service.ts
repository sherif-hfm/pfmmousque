import { Injectable } from '@angular/core';
import { observable, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Routes, CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';


import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements CanActivate{
  constructor(public http: HttpClient,public settings: SettingsService) { 
    
  }

public get isAuth(): boolean {
    return localStorage.getItem("isAuth")=='true'?true:false;
 }
public set isAuth(value: boolean) {
    localStorage.setItem('isAuth',value==true?'true':'false');
}
  

  login(info:any){
    console.log('login');
    return this.http.post( this.settings.ApiBaseUrl +  '/auth/login' ,info,{observe:'body',responseType:'json'});
  }

  logout(){
    console.log('logout');
    return this.http.get( this.settings.ApiBaseUrl +  '/auth/logout' ,{observe:'body',responseType:'json'});
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean>{
    console.log('canActivate');
    return this.http.get<boolean>( this.settings.ApiBaseUrl +  '/auth/isAdmin' ,{observe:'body',responseType:'json'});
    //return this.permissions.canActivate(this.currentUser, route.params.id);
  }
}
