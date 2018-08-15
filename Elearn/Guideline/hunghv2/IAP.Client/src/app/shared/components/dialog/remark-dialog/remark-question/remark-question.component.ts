import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RemarkQuestionModel } from './remark-question.model';

@Component({
  selector: 'iap-remark-question',
  templateUrl: './remark-question.component.html',
  styleUrls: ['./remark-question.component.scss']
})
export class RemarkQuestionComponent implements OnInit {
  @Input() data: RemarkQuestionModel;
  @Output() remarkQuestion: EventEmitter<RemarkQuestionModel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleRate(rate: number) {
    this.data.rate = rate;
    this.remarkQuestion.emit(this.data);
  }

}
