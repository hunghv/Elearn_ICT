import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  AssurancePlanDialogComponent
} from '../../../../web/annual-assurance-plan/assurance-plan/assurance-plan-dialog/assurance-plan-dialog.component';
import { AssurancePlanService } from '../../../../shared/services/IAP/annual-assurance-plan/assurance-plan/assurance-plan.service';
import { AssurancePlan } from '../../../../shared/models/IAP/annual-assurance-plan/assurance-plan.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Pager } from '../../../../shared/models/common.model';
import { FormBuilder } from '@angular/forms';
import { PaginationTemplateComponent } from '../../../../shared/components/common/pagination-template/pagination-template.component';


@Component({
  selector: 'iap-list-ap',
  templateUrl: './list-ap.component.html',
  styleUrls: ['./list-ap.component.scss']
})
export class ListApComponent implements OnInit {
  isShowFilter = false;

  constructor(private apService: AssurancePlanService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  @ViewChild(PaginationTemplateComponent) child: PaginationTemplateComponent;
  assurancePlans: AssurancePlan[] = [];
  id;
  form;
  count = 0;
  color = 'red';
  isSearch = false;
  // create Pager Model
  pager = new Pager({pageSize: 6, lstPageSize: [6, 12]});
  ngOnInit() {
    this.form = ({
      pageNumber: '',
      pageSize: ''
    });
    this.pagingClick(this.pager);
    this.getAll(this.form);
  }

  pagingClick(pager) {
    this.isSearch = false;
    this.form.pageNumber = pager.currentPage;
    this.form.pageSize = pager.pageSize;
    this.getAll(this.form);
  }

  searchClick(form) {
    form.pageNumber = this.pager.currentPage;
    form.pageSize = this.pager.pageSize;
    this.form = form;
    this.getAll(form);
    this.isSearch = true;
  }

  getAll(form) {
    this.apService.searchByFilter(form)
    .subscribe(res => {
      this.assurancePlans = res.items;
      this.pager.totalItems = res.totalCount;
      if (this.isSearch) {
        this.child.setPage(1);
      }
    });
  }

  onDelete(item) {
    // this.apService.deleteElement(this.assurancePlans, item);
    this.getAll(this.form);
  }

  openAssurancePlan() {
    this.router.navigateByUrl('/web/annual-assurance-plan/assurance-plan-create');
  }

  onCancelClick() {
    this.isShowFilter = false;
  }

  showFilter() {
    this.isShowFilter = !this.isShowFilter;
  }

  onResetClick() {
    this.form = ({});
    this.pagingClick(this.pager);
  }
}
