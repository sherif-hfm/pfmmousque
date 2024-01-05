import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { ArabicNumsService} from '../services/arabic-nums.service';
import { ReportsService} from '../services/reports.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  searchYear:string='';
  funeralList:any[]=[];
  
  constructor(public reportsService: ReportsService,public arabicNums: ArabicNumsService) {

   }

  ngOnInit(): void {
  }

  getMonthlyReport(){
    this.reportsService.getMonthlyReport(this.searchYear).subscribe({
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
    this.getMonthlyReport();
  }
}
