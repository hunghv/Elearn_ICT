import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Pager } from '../../models/common.model';

@Injectable()
export class CommonService {

  constructor() { }
  deleteElement(lstItem: any, item: any){
    var index = lstItem.findIndex((i) => (i===item));
    if (index != -1) {
      lstItem.splice(index, 1);
    }
    return lstItem;
  }

  // Pagination Service
  getPager(pager: Pager) {
    // calculate total pages
    const totalPages = Math.ceil(pager.totalItems / pager.pageSize);

    let startPage: number, endPage: number;
    // set start page, end page
    startPage = 1;
    endPage = totalPages;
    // calculate start and end item indexes
    const startIndex = (pager.currentPage - 1) * pager.pageSize + 1;
    const endIndex = pager.currentPage * pager.pageSize > pager.totalItems
                     ? pager.totalItems : pager.currentPage * pager.pageSize;

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    pager.pages = pages;
    pager.startIndex = startIndex;
    pager.endIndex = endIndex;

    return pager;
 }
}
