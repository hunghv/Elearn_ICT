import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { ISideBarState } from '../../../store/core.store';
import { TOGGLE_SIDE_BAR } from '../../../store/action/core.action';
import { Observable } from 'rxjs/Observable';
import { Unsubscribe } from 'redux';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'iap-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @select(['sidebarState', 'isSidebarExpand']) isSidebarExpand$: Observable<boolean>;

  // @select((state => state.isSidebarExpand)) isSidebarExpand: Observable<boolean>;

  constructor(private ngRedux: NgRedux<ISideBarState>) {
  }

  ngOnInit() {
  }

  toggleSideBar() {
    this.ngRedux.dispatch({ type: TOGGLE_SIDE_BAR });
  }

}
