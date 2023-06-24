import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArabicNumsService {
  codes:any={};
  
  constructor() {
    this.codes['0'] = '\u0660'; //1632
    this.codes['1'] = '\u0661';
    this.codes['2'] = '\u0662';
    this.codes['3'] = '\u0663';
    this.codes['4'] = '\u0664';
    this.codes['5'] = '\u0665';
    this.codes['6'] = '\u0666';
    this.codes['7'] = '\u0667';
    this.codes['8'] = '\u0668';
    this.codes['9'] = '\u0669';
    this.codes['-'] = '-';
    this.codes[' '] = ' ';
   }

   toArabicNum(enNum:string){
    let enNumStr=enNum.toString();
    let arNum = '';
    for(let i=0;i < enNumStr.length;i++){
        if(this.codes[enNumStr.charAt(i)])
        {
          arNum+=this.codes[enNumStr.charAt(i)];
        }
        else
        {
          arNum+=enNum.charAt(i);
        }
    }
    return arNum;
};

}
