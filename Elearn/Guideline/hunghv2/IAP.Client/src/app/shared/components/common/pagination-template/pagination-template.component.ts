import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { Pager } from '../../../models/common.model';

@Component({
  selector: 'iap-pagination-template',
  templateUrl: './pagination-template.component.html',
  styleUrls: ['./pagination-template.component.scss']
})
export class PaginationTemplateComponent implements OnInit {

  // pager object
  @Input() pager: Pager;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPagingClick: EventEmitter<any> = new EventEmitter();

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.setPage(this.pager.currentPage);
  }

  setPage(selectedPage: number = 1) {
    const oldSelectedPage = this.pager.currentPage;
    this.pager.currentPage = selectedPage;
    // get pager object from service
    this.pager = this.commonService.getPager(this.pager);
    // set selected page
    const cdp = document.getElementById('paginationTemplate');
    if (cdp !== null) {
      cdp.setAttribute('actpage', selectedPage.toString());
    }
    // call back parent to get new lst by page
    if (selectedPage !== oldSelectedPage) {
      this.onPagingClick.emit(this.pager);
    }
  }

  changePageSize(pageSize: number = 5) {
    this.pager.pageSize = pageSize;
    this.pager.currentPage = 1;
    // get pager object from service
    this.pager = this.commonService.getPager(this.pager);
    // set selected page
    const cdp = document.getElementById('paginationTemplate');
    if (cdp !== null) {
      cdp.setAttribute('actpage', this.pager.currentPage.toString());
    }
    // call back parent to get new lst by page
    this.onPagingClick.emit(this.pager);
  }
}
