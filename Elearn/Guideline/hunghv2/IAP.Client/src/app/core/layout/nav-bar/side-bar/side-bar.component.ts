import { Component, OnInit, Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { ISideBarState } from '../../../store/core.store';
import { COLLAPSE_SIDE_BAR } from '../../../store/action/core.action';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'iap-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @select(['sidebarState', 'isSidebarExpand']) isSidebarExpand$: Observable<boolean>;

  constructor(private ngRedux: NgRedux<ISideBarState>) {
  }

  ngOnInit() {
  }

  collapseSideBar() {
    this.ngRedux.dispatch({ type: COLLAPSE_SIDE_BAR });
  }
}
