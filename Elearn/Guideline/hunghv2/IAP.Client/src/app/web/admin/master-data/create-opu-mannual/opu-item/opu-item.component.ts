import { Component, OnInit, Input } from '@angular/core';
import { OPU } from '../../../../../shared/models/IAP/annual-assurance-plan/opu.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'iap-opu-item',
  templateUrl: './opu-item.component.html',
  styleUrls: ['./opu-item.component.scss']
})
export class OpuItemComponent implements OnInit {
  dateView: string;
  @Input() opu: OPU;
  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.dateView = this.datePipe.transform(this.opu.insertedAt, 'HH:mm, dd MMM yyyy');
  }

}
