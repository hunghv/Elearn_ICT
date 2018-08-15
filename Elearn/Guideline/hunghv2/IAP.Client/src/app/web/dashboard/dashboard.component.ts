import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { UserControlInfo } from '../../shared/models/common.model';
import { Workflow, CommandViewModel } from '../../shared/models/buttons/button.model';
import { MatDialog } from '@angular/material';
import { RemarkDialogComponent } from '../../shared/components/dialog/remark-dialog/remark-dialog.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { IapHttpClient } from '../../shared/services/iap-http-client/iap-http-client.service';
import { APP_CONFIG } from '../../shared/services/app-config/app-config.service';
import { BreadscrumbItem } from '../../shared/models/breadscrumb/breadscrumb-item.model';
import { DashboardService } from '../../shared/services/data-service/dashboard.service';
import { ChartModel, SeriesModel } from '../../shared/models/IAP/Dashboard/dashboard.model';

@Component({
  selector: 'iap-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  buttons;

  breadscrumbData: BreadscrumbItem[];
  workflow;

  dropdownData: any[];
  dropdown2Data: any;
  userId: any;

  constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private apService: DashboardService
  ) {
    this.titleService.setTitle('myAssurance | Dashboard');
  }

  dataFirstLine: any[] = [];
  dataSecondLine: any[] = [];
  jsonFirstLine;
  jsonSecondLine;
  titleFirstLine;
  secondFirstLine;
  isFinish = false;

  ngOnInit() {
    const currentYear = (new Date()).getFullYear();
    this.getAssurancePlanByYear(currentYear);
  }

  handleDropdownChange(data) {
    this.userId = data.value;
  }

  // get assurance plant by year
  getAssurancePlanByYear(year) {
    this.createModelDefault(this.dataFirstLine);
    this.createModelDefault(this.dataSecondLine);
    this.apService.getAssurancePlanByYear(year)
    .subscribe(res => {
      if (res.length > 0) {
        res.forEach(element => {
          if (element.assuranceLine === 'First Line') {
            const obj = this.calResultByMonth(element);
            this.dataFirstLine.forEach(item => {
              if (item.name === obj.name) {
                item.series.push(new Object({
                  name: obj.series[0].name,
                  value: obj.series[0].value
                }));
              }
            });
          }
          if (element.assuranceLine === 'Second Line') {
            const obj = this.calResultByMonth(element);
            this.dataSecondLine.forEach(item => {
              if (item.name === obj.name) {
                item.series.push(new Object({
                  name: obj.series[0].name,
                  value: obj.series[0].value
                }));
              }
            });
          }
        });
      }
      this.jsonFirstLine = JSON.parse(JSON.stringify(this.dataFirstLine));
      this.jsonSecondLine = JSON.parse(JSON.stringify(this.dataSecondLine));
      this.titleFirstLine = "First Line";
      this.secondFirstLine = "Second Line";
      this.isFinish = true;
    });
  }

  createModelDefault(lstObj){
    for(let i = 1; i <= 12; i++){
      const obj = new ChartModel();
      obj.series = [];
      switch (i) {
        case 1: {
          obj.name = 'Jan';
          break;
        }
        case 2: {
          obj.name = 'Feb';
          break;
        }
        case 3: {
          obj.name = 'Mar';
          break;
        }
        case 4: {
          obj.name = 'Apr';
          break;
        }
        case 5: {
          obj.name = 'May';
          break;
        }
        case 6: {
          obj.name = 'Jun';
          break;
        }
        case 7: {
          obj.name = 'Jan';
          break;
        }
        case 8: {
          obj.name = 'Aug';
          break;
        }
        case 9: {
          obj.name = 'Sep';
          break;
        }
        case 10: {
          obj.name = 'Oct';
          break;
        }
        case 11: {
          obj.name = 'Nov';
          break;
        }
        case 12: {
          obj.name = 'Dec';
          break;
        }
      }
      lstObj.push(obj);
    }
  }
  calResultByMonth(obj) {
    const result = new ChartModel();
    result.series = [];
    var s = new SeriesModel();
    s.name = obj.status === 'Closed' ? 'Closed' : 'Open';
    s.value = obj.count;
    result.series.push(s);
    switch (obj.month) {
      case 1: {
        result.name = 'Jan';
        break;
      }
      case 2: {
        result.name = 'Feb';
        break;
      }
      case 3: {
        result.name = 'Mar';
        break;
      }
      case 4: {
        result.name = 'Apr';
        break;
      }
      case 5: {
        result.name = 'May';
        break;
      }
      case 6: {
        result.name = 'Jun';
        break;
      }
      case 7: {
        result.name = 'Jan';
        break;
      }
      case 8: {
        result.name = 'Aug';
        break;
      }
      case 9: {
        result.name = 'Sep';
        break;
      }
      case 10: {
        result.name = 'Oct';
        break;
      }
      case 11: {
        result.name = 'Nov';
        break;
      }
      case 12: {
        result.name = 'Dec';
        break;
      }
    }
    return result;
  }

  onSelect(event) {
    console.log(event);
  }
}
