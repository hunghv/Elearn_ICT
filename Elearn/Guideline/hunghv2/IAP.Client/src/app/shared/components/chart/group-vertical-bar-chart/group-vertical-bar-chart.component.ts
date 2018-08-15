import { Component, OnInit, Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'iap-group-vertical-bar-chart',
  templateUrl: './group-vertical-bar-chart.component.html',
  styleUrls: ['./group-vertical-bar-chart.component.scss']
})

export class GroupVerticalBarChartComponent implements OnInit {

  @Input() dataInput;
  @Input() titleInput;
  view: any[] = [1200, 350];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = this.titleInput;
  showYAxisLabel = true;
  yAxisLabel = 'Number Of Assurance Plan';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  ngOnInit() {
    this.xAxisLabel = this.titleInput;
    const a = this.dataInput;
    Object.assign(this, { a } );
  }

  onSelect(event) {
    console.log(event);
  }
}


// @NgModule({
//   imports: [ BrowserModule, BrowserAnimationsModule, NgxChartsModule ],
//   declarations: [ GroupVerticalBarChartComponent ],
//   bootstrap: [ GroupVerticalBarChartComponent ]
// })
// export class AppModule {}
