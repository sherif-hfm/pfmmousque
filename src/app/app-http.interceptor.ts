import { Injectable } from '@angular/core';
import {  HttpRequest,HttpResponse,  HttpHandler,  HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { animate } from '@angular/animations';
import { Router } from '@angular/router';

import { AuthService} from './services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(public authService:AuthService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request).pipe(tap({
      next:(e)=>{
      },
      error:(e)=>{
        if(e.status==401){
          this.authService.isAuth=false;
          this.router.navigate(['/login']);
        }
      }
    }));
  }
}
