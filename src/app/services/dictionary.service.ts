import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor() { }

  getSexDesc(sexId:string){
    switch(sexId){
      case 'M':
        return 'ذكر';
        case 'F':
        return 'انثى';
        case 'B':
        return 'طفل';
        case 'G':
        return 'طفلة';
        default:
          return '';
    }
  }
  getPrayerDesc(prayerId:number){
    switch(prayerId){
      case 1:
        return 'الفجر';
        case 2:
        return 'الظهر';
        case 3:
        return 'العصر';
        case 4:
        return 'المعرب';
        case 5:
        return 'العشاء';
        default:
          return '';
    }
  }
}
