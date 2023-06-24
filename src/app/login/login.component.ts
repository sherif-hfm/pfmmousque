import { Component, OnInit,OnChanges } from '@angular/core';
import { FormGroup, FormControl,FormArray,FormBuilder,Validators, ValidationErrors  } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService} from '../services/auth.service';
import { AlertTypes} from '../alert/alert.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showAlert:AlertTypes=AlertTypes.none;
  alertMessage:string='ok';
  loginFrom = this.fb.group({
    userLogin:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
  });

  constructor(public authService:AuthService,private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    
  }

  login(){
    if(this.loginFrom.status==='INVALID'){
      return;
    }
    const info={
      userLogin:this.loginFrom.get('userLogin')?.value,
      password:this.loginFrom.get('password')?.value
    }
    this.authService.login(info).subscribe({
      next:(data:any)=>{
       this.authService.isAuth=true;
       this.router.navigate(['/admin']);
      },
      error:(err:any)=>{
        this.alertMessage='حدث خطأ اثناء عملية تسجيل الدخول';
        this.showAlert=AlertTypes.danger;
        console.log('http error');
        console.log(err.error);
      }
    });
  }

}
