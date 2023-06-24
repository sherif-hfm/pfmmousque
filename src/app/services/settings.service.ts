import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // private _apiBaseUrl : string="" ;
  public get ApiBaseUrl() : string {
    return environment.settings.apiUrl;
  }
  constructor() { }
}
