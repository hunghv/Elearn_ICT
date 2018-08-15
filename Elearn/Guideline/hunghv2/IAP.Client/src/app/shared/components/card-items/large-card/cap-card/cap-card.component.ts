import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iap-cap-card',
  templateUrl: './cap-card.component.html',
  styleUrls: ['./cap-card.component.scss']
})
export class CapCardComponent implements OnInit {
  color = '#58478D';
  leadAssessor = 'Khang Luong';
  teamLead;
  listCap = ['a', 'b', 'b'];
  constructor() { }

  ngOnInit() {
  }
  getColor() {
    return this.color;
  }
}
