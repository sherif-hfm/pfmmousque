import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(public http: HttpClient,public settings: SettingsService) {
    
  }

  getMonthlyReport(year: any){
    console.log('getMonthlyReport');
    return this.http.get( this.settings.ApiBaseUrl +  '/reports/monthlyReport/' + year  ,{observe:'body',responseType:'json'});
  }
}
