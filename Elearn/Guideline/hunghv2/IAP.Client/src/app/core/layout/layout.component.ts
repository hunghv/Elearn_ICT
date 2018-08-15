import { Component, OnInit, ViewChild, QueryList, ElementRef, NgZone } from '@angular/core';
import { routerTransition } from './layout.animation';
import { BackgroundLoader } from '../../shared/services/background-loader/background-loader.service';
import { ScrollToElementService } from '../../shared/services/scroll-to-element/scroll-to-element.service';
import { Observable } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'iap-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routerTransition],
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('webContent', { read: ElementRef }) webContent: ElementRef;
  private scrolling = new Subject();

  scrollButtonActive: boolean;

  constructor(private scrollTo: ScrollToElementService,
    private zone: NgZone
  ) {

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      Observable.fromEvent(this.webContent.nativeElement, 'scroll')
        .debounceTime(200).subscribe((e: Event) => {
          this.zone.run(() => {
            this.scrolling.next(e);
          });
        });
    });
    this.scrolling.subscribe((e: Event) => {
      this.onScroll(e);
    });
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  onScroll(event) {
    if (!event && !event.target) { return; }
    const scrollTop = event.target.scrollTop;
    if (scrollTop > 50) {
      this.scrollButtonActive = true;
    } else {
      this.scrollButtonActive = false;
    }
  }

  scrollTop() {
    if (this.webContent) {
      this.scrollTo.scroll(this.webContent.nativeElement);
    }
  }
}
