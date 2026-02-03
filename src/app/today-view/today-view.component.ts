import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FuneralService } from '../services/funeral.service';
import { ArabicNumsService } from '../services/arabic-nums.service';
import { UmalquraCalendarService } from '../services/umalqura-calendar.service';

interface FuneralDetail {
  deadName: string;
  prayerId: number;
  prayerName: string;
  placeId: number;
  placeName: string;
  sexId: string;
  sexName: string;
  ambulanceNo: string;
  graveNo: string;
  notes: string;
}

interface GroupedFuneral {
  prayerId: number;
  prayerName: string;
  funerals: FuneralDetail[];
}

@Component({
  selector: 'app-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.css']
})
export class TodayViewComponent implements OnInit, OnDestroy {

  funeralDetails: FuneralDetail[] = [];
  groupedFunerals: GroupedFuneral[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  // Auto-scroll properties
  private scrollInterval: any = null;
  private scrollSpeed: number = 1; // pixels per interval
  private scrollIntervalTime: number = 50; // milliseconds
  private pauseAtBottom: number = 3000; // pause 3 seconds at bottom before refresh
  private isScrolling: boolean = false;

  // Prayer order for sorting (Fajr to Isha)
  prayerOrder: { [key: number]: number } = {
    1: 1, // الفجر
    2: 2, // الظهر
    3: 3, // العصر
    4: 4, // المغرب
    5: 5  // العشاء
  };

  // Sex order for sorting: M (men) = 1, F (women) = 2, B/G (children) = 3
  sexOrder: { [key: string]: number } = {
    'M': 1,  // رجل
    'F': 2,  // امرأة
    'B': 3,  // طفل
    'G': 3   // طفلة
  };

  constructor(
    public funeralService: FuneralService,
    public arabicNums: ArabicNumsService,
    public umalquraCalendar: UmalquraCalendarService
  ) { }

  ngOnInit(): void {
    this.loadTodayDetails();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  loadTodayDetails(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.stopAutoScroll();
    
    this.funeralService.getTodayDetails().subscribe({
      next: (data: any) => {
        console.log('Today details:', data);
        this.funeralDetails = data;
        this.groupAndSortData();
        this.isLoading = false;
        
        // Start auto-scroll after data loads and DOM updates
        setTimeout(() => {
          this.startAutoScroll();
        }, 1000);
      },
      error: (err: any) => {
        console.log('http error', err);
        this.errorMessage = 'حدث خطأ في تحميل البيانات';
        this.isLoading = false;
        
        // Retry after 10 seconds on error
        setTimeout(() => {
          this.loadTodayDetails();
        }, 10000);
      }
    });
  }

  startAutoScroll(): void {
    if (this.isScrolling) return;
    
    // Check if content is scrollable
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollHeight <= clientHeight) {
      // No need to scroll, just refresh after a delay
      setTimeout(() => {
        window.scrollTo({ top: 0 });
        this.loadTodayDetails();
      }, 30000); // Refresh every 30 seconds if no scroll needed
      return;
    }

    this.isScrolling = true;
    window.scrollTo({ top: 0 }); // Start from top
    
    this.scrollInterval = setInterval(() => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (currentScroll >= maxScroll - 5) {
        // Reached bottom, pause then refresh
        this.stopAutoScroll();
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            this.loadTodayDetails();
          }, 1000);
        }, this.pauseAtBottom);
      } else {
        // Continue scrolling
        window.scrollBy(0, this.scrollSpeed);
      }
    }, this.scrollIntervalTime);
  }

  stopAutoScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
    this.isScrolling = false;
  }

  groupAndSortData(): void {
    // Group by prayerName
    const groups: { [key: string]: GroupedFuneral } = {};

    this.funeralDetails.forEach(funeral => {
      const key = funeral.prayerId.toString();
      if (!groups[key]) {
        groups[key] = {
          prayerId: funeral.prayerId,
          prayerName: funeral.prayerName,
          funerals: []
        };
      }
      groups[key].funerals.push(funeral);
    });

    // Convert to array and sort by prayer order
    this.groupedFunerals = Object.values(groups).sort((a, b) => {
      return (this.prayerOrder[a.prayerId] || 99) - (this.prayerOrder[b.prayerId] || 99);
    });

    // Sort funerals within each group: men first, then women, then children
    this.groupedFunerals.forEach(group => {
      group.funerals.sort((a, b) => {
        return (this.sexOrder[a.sexId] || 99) - (this.sexOrder[b.sexId] || 99);
      });
    });
  }

  getCurrentGregorianDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('ar-SA-u-nu-latn', options);
  }

  getHijriDateFormatted(): string {
    const hijriDate = this.umalquraCalendar.getCurrentDate();
    return `${hijriDate.dayName} ${this.arabicNums.toArabicNum(hijriDate.day.toString())} ${hijriDate.monthName} ${this.arabicNums.toArabicNum(hijriDate.year.toString())} هـ`;
  }

  getGregorianDateFormatted(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return `${this.arabicNums.toArabicNum(day.toString())} ${months[month - 1]} ${this.arabicNums.toArabicNum(year.toString())} م`;
  }

  getTotalFunerals(): number {
    return this.funeralDetails.length;
  }

  refreshData(): void {
    window.scrollTo({ top: 0 });
    this.loadTodayDetails();
  }

  // Pause scrolling on user interaction, resume after 10 seconds
  @HostListener('window:touchstart')
  @HostListener('window:mousedown')
  onUserInteraction(): void {
    if (this.isScrolling) {
      this.stopAutoScroll();
      // Resume auto-scroll after 10 seconds of no interaction
      setTimeout(() => {
        this.startAutoScroll();
      }, 10000);
    }
  }
}
