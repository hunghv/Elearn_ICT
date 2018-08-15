import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iap-opu-aap',
  templateUrl: './opu-aap.component.html',
  styleUrls: ['./opu-aap.component.scss']
})
export class OpuAapComponent implements OnInit {

  isRequiredAction: boolean;

  constructor() {
    this.isRequiredAction = false;
  }

  ngOnInit() {
  }

}
