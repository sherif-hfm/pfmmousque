import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  minheight: number = window.screen.availHeight;
  title = 'pfmmousque';
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    this.updateLayout(this.router.url);
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => this.updateLayout(e.url));
  }

  private updateLayout(url: string): void {
    this.minheight = url.includes('/login') ? 0 : window.screen.availHeight;
    this.showHeaderFooter = !url.includes('/todayview');
  }
}
