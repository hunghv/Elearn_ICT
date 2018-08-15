import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentAapService } from '../../../shared/services/IAP/annual-assurance-plan/department-aap/department-aap.service';
import { DeptAAP } from '../../../shared/models/IAP/annual-assurance-plan/departmentAAP.model';
import { Pager } from '../../../shared/models/common.model';
import { PaginationTemplateComponent } from '../../../shared/components/common/pagination-template/pagination-template.component';

@Component({
  selector: 'iap-search-department-aap',
  templateUrl: './search-department-aap.component.html',
  styleUrls: ['./search-department-aap.component.scss']
})
export class SearchDepartmentAapComponent implements OnInit {
  lstDepartment: DeptAAP[] = [];
  isShowFilter = false;
  constructor(
    private deptAapService: DepartmentAapService,
  ) { }

  @ViewChild(PaginationTemplateComponent) child: PaginationTemplateComponent;
  form;
  count = 0;
  isSearch = false;
  // create Pager Model
  pager = new Pager({pageSize: 6, lstPageSize: [6, 12]});
  ngOnInit() {
    // this.getListDepartment();
    this.form = ({
      pageNumber: '',
      pageSize: ''
    });
    this.pagingClick(this.pager);
  }

  pagingClick(pager) {
    this.isSearch = false;
    this.form.pageNumber = pager.currentPage;
    this.form.pageSize = pager.pageSize;
    this.getAll(this.form);
  }

  getAll(form) {
    this.deptAapService.searchByFilter(form)
    .subscribe(res => {
      this.lstDepartment = res.items;
      this.pager.totalItems = res.totalCount;
      if (this.isSearch) {
        this.child.setPage(1);
      }
    });
  }

  toggleFilter() {
    this.isShowFilter = !this.isShowFilter;
  }

  onDelete(item) {
    this.deptAapService.deleteElement(this.lstDepartment, item);
  }

  onCancelClick() {
    this.isShowFilter = false;
  }

  showFilter() {
    this.isShowFilter = !this.isShowFilter;
  }
  onResetClick() {
    this.getListDepartment();
  }

  onSearchClick(form) {
    this.deptAapService.searchByFilter(form)
    .subscribe(res => {
      this.lstDepartment = res.items;
      this.count = res.totalCount;
      this.getAll(form);
      this.isSearch = true;
    });
  }

  getListDepartment() {
    this.deptAapService.getAll()
    .subscribe(res => {
      this.lstDepartment = res.items;
      this.count = res.totalCount;
    });
  }
}
