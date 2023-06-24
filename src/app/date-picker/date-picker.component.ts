import { Component, OnInit,Input } from '@angular/core';
import { UmalquraCalendarService } from '../services/umalqura-calendar.service';
import { ArabicNumsService } from '../services/arabic-nums.service';

enum CalendarTypes
{
    UmAlQuraCalendar = 1,
    GregorianCalendar = 2
}

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})


export class DatePickerComponent implements OnInit {

  

  @Input() ReadOnly = false;
  @Input() Theme = '';
  @Input() AllowChangeCalendar = true;
  @Input() MinDate:Date = new Date(2000,0,1);
  @Input() MaxDate:Date = new Date(2050,11,31);
  @Input() DefaultDate = null;
  @Input() AllowUmAlQuraCalendar = true;
  @Input() AllowGregorianCalendar = true;
  @Input() CurrentCalendarType:CalendarTypes = CalendarTypes.GregorianCalendar;
  // @Input() SelectedDate = true;
  
  @Input()
  public get SelectedDate(): any {
    return this._selectedDate;
 }
public set SelectedDate(value: any) {
    if (value) {
        this._selectedDate=value;
    }
}
_selectedDate:any=null;
  isShow= false;
  popupTop= 0;
  popupLeft= 0;
  selectedDateStr= null;

  /**  */
  gregorianMonths:string[]= ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
  hijriMonths:string[]= ['محرم', 'سفر', 'ربيع اول', 'ربيع ثان', 'جمادي اول', 'جمادي ثاني', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
  
  _selectedYear:number= 2022;

  public get selectedYear(): any {
    return this._selectedYear;
 }
public set selectedYear(value: any) {
  console.log('selectedYear')
    if (value) {
        this._selectedYear=value;
    }
}

public get shownYear(): any {
  return this.getShownYear();
}
public set shownYear(value: any) {
  if (value) {
      this._selectedYear=value;
  }
}

public get currentDate():Date{
  let ceDate=new Date();
  return new Date(ceDate.getFullYear(), ceDate.getMonth(), ceDate.getDate());
}

  selectedMonthIndex:any= null;
  selectedDay= null;
  ptop:any=null;
  pleft:any=null;
  popupDisplay:any=false;
  
  
  constructor(public umAlQuraHelper:UmalquraCalendarService,public arabicNumsService:ArabicNumsService) {

  }

  ngOnInit(): void {
   
  }
  arabicNums(num:any){
    return this.arabicNumsService.toArabicNum(num);
  }
  getShownYear():any{
    if(this.selectedYear != null)
      return this.selectedYear;
      else{
        if(this.CurrentCalendarType==CalendarTypes.GregorianCalendar)
          return this.getGregorianShownYear();
        else
          return this.getUmAlQuraShownYear();
      }
  }

  getGregorianShownYear():number{
    if(this.currentDate >= this.MinDate && this.currentDate <= this.MaxDate){
        return this.currentDate.getFullYear();
    }
    else{
      return this.MinDate.getFullYear();
    }
  }
  getUmAlQuraShownYear():number{
    if(this.currentDate >= this.MinDate && this.currentDate <= this.MaxDate){
      return this.umAlQuraHelper.getCurrentDate().year;
    }
    else{
      return this.umAlQuraHelper.gregorianToUmAlQura(this.MinDate).year;
    }
  }

  getSelectedDate() {
    return "";
    if (this.SelectedDate != null) {
        if (this.CurrentCalendarType == CalendarTypes.GregorianCalendar ) {
            return this.SelectedDate.getFullYear() + '/' + (this.SelectedDate.getMonth() + 1) + '/' + this.SelectedDate.getDate();
        }
        else {
            let umAlQuradate = this.umAlQuraHelper.gregorianToUmAlQura(this.SelectedDate);
            return umAlQuradate.year + '/' + umAlQuradate.month + '/' + umAlQuradate.day;
        }
    }
    else {
        return "";
    }
}

show(event:any) {
  // event.stopPropagation();
  // this.isShow = true;
  // var posInfo = this.$refs.picker.getBoundingClientRect();
  // this.popupTop = posInfo.top + 45 + window.scrollY;
  // this.popupLeft = posInfo.left + window.scrollX;
  // this.$refs.text.focus();
}

resize(event:any) {
  // if (this.isShow == true) {
  //     //var posInfo = this.$refs.picker.getBoundingClientRect();
  //     this.popupTop = posInfo.top + 45 + window.scrollY;
  //     this.popupLeft = posInfo.left + window.scrollX;
  // }
}

document_click(event:any) {
  this.isShow = false;
}

clearDate(e:any) {
  // let hdnSelectedDate = document.getElementById(prms.hdnSelectedDate);
  // hdnSelectedDate.value = "";
  // this.selectedDate = null;

  // if (prms.OnClientDateSelected != null) {
  //     window[prms.OnClientDateSelected](this);
  // }

  // if (prms.AutoPostBack == true) {

  //     document.getElementById(prms.btnPostBack).click();
  // }
}

setSelectedDate() {
  // let hdnSelectedDate = document.getElementById(prms.hdnSelectedDate);
  // if (hdnSelectedDate.value != "") {
  //     let dateParts = hdnSelectedDate.value.split('/');
  //     if (dateParts.length == 3) {
  //         this.selectedDate = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
  //     }
  // }
}

setCalendarType() {
  // let hdnCalendarType = document.getElementById(prms.hdnCalendarType);
  // this.calendartype = hdnCalendarType.value == 'true' ? true : false;
}

setAllowdCalendars() {
  // let hdnAllowdCalendars = document.getElementById(prms.hdnAllowdCalendars);
  // if (hdnAllowdCalendars.value != "") {
  //     let allowdCalendars = JSON.parse(hdnAllowdCalendars.value);
  //     if (allowdCalendars.length < 2) {
  //         this.allowChangeCalendar = false;
  //         this.calendartype = allowdCalendars[0] == 1 ? false : true;
  //     }
  // }
}
setMinMaxDate() {
  // let minDateParts = prms.minDate.split('/');
  // if (minDateParts.length == 3) {
  //     this.minDate = new Date(parseInt(minDateParts[2]), parseInt(minDateParts[1]) - 1, parseInt(minDateParts[0]));
  // }
  // let maxDateParts = prms.maxDate.split('/');
  // if (maxDateParts.length == 3) {
  //     this.maxDate = new Date(parseInt(maxDateParts[2]), parseInt(maxDateParts[1]) - 1, parseInt(maxDateParts[0]));
  // }
  // let defDateParts = prms.defaultDate.split('/');
  // if (defDateParts.length == 3) {
  //     this.defaultDate = new Date(parseInt(defDateParts[2]), parseInt(defDateParts[1]) - 1, parseInt(defDateParts[0]));
  // }
};
calendarTypeClick() {

  if (this.AllowChangeCalendar) {
      this.CurrentCalendarType =this.CurrentCalendarType==CalendarTypes.GregorianCalendar? CalendarTypes.UmAlQuraCalendar :CalendarTypes.GregorianCalendar ;
  }
};
/** *********************************/
getYears():any[] {
  if (this.CurrentCalendarType == CalendarTypes.GregorianCalendar)
      return this.getGregorianYears();
  else
      return this.getHijriYears();
  return [];
}
getMonths():any[] {
  let months = [];
  if (this.CurrentCalendarType == CalendarTypes.GregorianCalendar)
      months = this.getregorianMonths();
  else
      months = this.getHijriMonths();
  // const monthIndex = months.find(m => m.index == this.selectedMonthIndex);
  // if (monthIndex == undefined) {
  //     this.selectedMonthIndex = months[0].index;
  // }
  return months;
}
getDays():any[] {
  // if (this.pcalendartype == true)
  //     return this.getGregorianDays();
  // else
  //     return this.getHijriDays();
  return [];
}

getGregorianYears() {
  let years = [];
  for (let year = this.MinDate.getFullYear(); year <= this.MaxDate.getFullYear(); year++) {
      years.push(year);
  }
  return years;
}

getHijriYears() {
  return[];
  // let years = [];
  // let minYear = umAlQuraHelper.gregorianToUmAlQura(this.pmindate).split('/')[2];
  // let maxYear = umAlQuraHelper.gregorianToUmAlQura(this.pmaxdate).split('/')[2];
  // for (let year = minYear; year <= maxYear; year++) {
  //     years.push(year);
  // }
  // return years;
}

getregorianMonths() {
  let months = [];
  for (let month = 0; month <= 11; month++) {
      let monthFirstDay = new Date(this.selectedYear, month, 1);
      let monthLastDay = new Date((new Date(this.selectedYear, month + 1, 1)).valueOf() - 86400000);
      if ((this.MinDate.valueOf() <= monthFirstDay.valueOf() && this.MaxDate.valueOf() >= monthLastDay.valueOf()) || (this.MaxDate.valueOf() >= monthFirstDay.valueOf() && this.MaxDate.valueOf() <= monthLastDay.valueOf()) || (this.MinDate.valueOf() >= monthFirstDay.valueOf() && this.MinDate.valueOf() <= monthLastDay.valueOf())) {
          months.push({ name: this.gregorianMonths[month], index: month });
      }
  }
  return months;
}

getHijriMonths() {
  return [];
  // let months = [];
  // for (let month = 0; month <= 11; month++) {
  //     let monthFirstDayStr = '01/' + ((month + 1) < 10 ? ('0' + (month + 1).toString()) : (month + 1).toString()) + '/' + this.selectedYear.toString();
  //     let monthFirstDay = umAlQuraHelper.umAlQuraToGregorian(monthFirstDayStr);
  //     let monthDays = umAlQuraHelper.UmAlQuraMonthDays(monthFirstDayStr);
  //     let monthLastDay = umAlQuraHelper.umAlQuraToGregorian(monthDays.toString() + '/' + ((month + 1) < 10 ? '0' + (month + 1).toString() : (month + 1).toString()) + '/' + this.selectedYear.toString());
  //     if ((this.pmindate.valueOf() <= monthFirstDay.valueOf() && this.pmaxdate.valueOf() >= monthLastDay.valueOf()) || (this.pmaxdate.valueOf() >= monthFirstDay.valueOf() && this.pmaxdate.valueOf() <= monthLastDay.valueOf()) || (this.pmindate.valueOf() >= monthFirstDay.valueOf() && this.pmindate.valueOf() <= monthLastDay.valueOf())) {
  //         months.push({ name: this.hijriMonths[month], index: month });
  //     }
  // };
  // return months;
}

getGregorianDays() {
  // let crDate = new Date();
  // crDate.setHours(0, 0, 0, 0);
  // let daySpace = [1, 2, 3, 4, 5, 6, 0]
  // let mdays = [];
  // let mDate = new Date(this.selectedYear, this.selectedMonthIndex, 1);
  // for (let day = 0; day < daySpace[mDate.getDay()]; day++) {
  //     mdays.push({ no: '', isDisabled: true });
  // }

  // for (let day = 0; day <= 30; day++) {

  //     let dDate = new Date(mDate.valueOf());
  //     dDate.setDate(dDate.getDate() + day);
  //     if (dDate.getMonth() == this.selectedMonthIndex) {
  //         if ((new Date(this.selectedYear, this.selectedMonthIndex, day + 1)).valueOf() <= this.pmaxdate.valueOf() && (new Date(this.selectedYear, this.selectedMonthIndex, day + 1)).valueOf() >= this.pmindate.valueOf()) {
  //             mdays.push({ no: dDate.getDate(), isDisabled: false, isCurrentDay: dDate.valueOf() == crDate.valueOf(), isSelectedDay: (this.selectedDate == null ? false : dDate.valueOf() == this.selectedDate.valueOf()) });
  //         }
  //         else {
  //             mdays.push({ no: dDate.getDate(), isDisabled: true });
  //         }
  //     }
  // }
  // return mdays;
}

getHijriDays() {
  // let crDate = new Date();
  // crDate.setHours(0, 0, 0, 0);
  // let daySpace = [1, 2, 3, 4, 5, 6, 0]
  // let mdays = [];
  // let monthFirstDay = '01/' + ((this.selectedMonthIndex + 1) < 10 ? '0' + (this.selectedMonthIndex + 1).toString() : (this.selectedMonthIndex + 1).toString()) + '/' + this.selectedYear.toString();
  // let monthFirstDayGerg = umAlQuraHelper.umAlQuraToGregorian(monthFirstDay);
  // let monthDays = umAlQuraHelper.UmAlQuraMonthDays(monthFirstDay);
  // for (let day = 0; day < daySpace[monthFirstDayGerg.getDay()]; day++) {
  //     mdays.push({ no: '', isDisabled: true });
  // }

  // for (let day = 0; day < monthDays; day++) {
  //     let dDate = new Date(monthFirstDayGerg.valueOf());
  //     dDate.setDate(dDate.getDate() + day);
  //     if (dDate.valueOf() >= this.pmindate.valueOf() && dDate.valueOf() <= this.pmaxdate.valueOf()) {
  //         mdays.push({ no: (day + 1), isDisabled: false, isCurrentDay: dDate.valueOf() == crDate.valueOf(), isSelectedDay: (this.selectedDate == null ? false : dDate.valueOf() == this.selectedDate.valueOf()) });
  //     }
  //     else {
  //         mdays.push({ no: (day + 1), isDisabled: true });
  //     }
  // }
  // return mdays;
}

getselectedDate() {
  // if (this.pcalendartype == true) {
  //     return new Date(this.selectedYear, this.selectedMonthIndex, this.selectedDay);
  // }
  // else {
  //     let umAlQuraDate = (this.selectedDay < 10 ? '0' + this.selectedDay.toString() : this.selectedDay.toString()) + '/' + ((this.selectedMonthIndex + 1) < 10 ? '0' + (this.selectedMonthIndex + 1).toString() : (this.selectedMonthIndex + 1).toString()) + '/' + this.selectedYear.toString();
  //     return umAlQuraHelper.umAlQuraToGregorian(umAlQuraDate);
  // }
}

setDefaultDate() {
  // let defDate = this.selectedDate == null ? this.defaultdate : this.selectedDate;
  // if (this.pcalendartype == true) {
  //     this.selectedYear = defDate.getFullYear();
  //     this.selectedMonthIndex = defDate.getMonth();
  //     this.selectedDay = this.selectedDate == null ? null : defDate.getDate();
  // }
  // else {
  //     let dateParts = umAlQuraHelper.gregorianToUmAlQura(defDate).split('/');
  //     this.selectedYear = parseInt(dateParts[2]);
  //     this.selectedMonthIndex = (parseInt(dateParts[1]) - 1);
  //     this.selectedDay = this.selectedDate == null ? null : parseInt(dateParts[0]);
  // }
}

popup_click(event:any) {
  event.stopPropagation();
}

wheel(e:any) {
  // if (e.deltaY < 0) {
  //     if ((this.selectedMonthIndex - 1) < 0) {
  //         let findYear = this.years.find(y => y == (this.selectedYear - 1));
  //         if (findYear != undefined) {
  //             this.selectedYear--;
  //             this.selectedMonthIndex = 11;
  //             return;
  //         }
  //     }
  //     let findMonth = this.months.find(m => m.index == (this.selectedMonthIndex - 1));
  //     if (findMonth != undefined) {
  //         this.selectedMonthIndex--;
  //     }
  // }
  // else {
  //     if ((this.selectedMonthIndex + 1) > 11) {
  //         let findYear = this.years.find(y => y == (this.selectedYear + 1));
  //         if (findYear != undefined) {
  //             this.selectedYear++;
  //             this.selectedMonthIndex = 0;
  //             return;
  //         }
  //     }
  //     let findMonth = this.months.find(m => m.index == (this.selectedMonthIndex + 1));
  //     if (findMonth != undefined) {
  //         this.selectedMonthIndex++;
  //     }
  // }
}

async dayClick(day:number) {
  // this.selectedDay = day;
  // this.selectedDate = this.getselectedDate();
  // await this.$emit('update:modelValue', this.selectedDate);

  // if (prms.OnClientDateSelected != null) {
  //     window[prms.OnClientDateSelected](this);
  // }

  // if (prms.AutoPostBack == true) {
  //     document.getElementById(prms.btnPostBack).click();
  // }
}

}
