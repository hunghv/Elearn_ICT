import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iap-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
