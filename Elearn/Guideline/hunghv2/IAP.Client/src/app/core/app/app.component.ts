import { Component } from '@angular/core';
import { AfterViewChecked, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BackgroundLoader } from '../../shared/services/background-loader/background-loader.service';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'iap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private loader: BackgroundLoader,
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() { }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader.show();
    }
    if (event instanceof NavigationEnd) {
      this.loader.hide();
    }

    if (event instanceof NavigationCancel) {
      this.loader.hide();
    }
    if (event instanceof NavigationError) {
      this.loader.hide();
    }
  }
}
