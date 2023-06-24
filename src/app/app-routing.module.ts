import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

import { FuneralListComponent } from './funeral-list/funeral-list.component';
import { LoginComponent } from './login/login.component';
import { FuneralDataComponent } from './funeral-data/funeral-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', component: FuneralListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: FuneralDataComponent,canActivate: [AuthService] },
   { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page

];
const routes2: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    {
      provide: 'AuthService',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    }
  ]
})
export class AppRoutingModule { }
