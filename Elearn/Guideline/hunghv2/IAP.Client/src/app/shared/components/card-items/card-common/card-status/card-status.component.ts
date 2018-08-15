import {
  Component,
  OnInit,
  Input,
  Output, EventEmitter, ContentChild, AfterContentInit, AfterViewInit, ViewChild, ElementRef
} from '@angular/core';

@Component({
  selector: 'iap-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.scss']
})
export class CardStatusComponent implements OnInit, AfterContentInit, AfterViewInit {


  @Input() time: string;
  @Input() status: string;
  @Input() disableAction = false;
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @ViewChild('statusContent') statusContent: ElementRef;

  toolTip: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    this.toolTip = (<HTMLElement>this.statusContent.nativeElement).innerText;
  }

  handleDeleteButtonClick(toggleSibling: any) {
    toggleSibling.hideTarget();
    this.deleteItem.emit();
  }

}
