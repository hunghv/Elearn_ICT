import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorType, ErrorIcon, ErrorMessage, ErrorTitle } from '../../shared/constants/error-type.constants';

@Component({
  selector: 'iap-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  private type: number;
  private sub: any;

  title: string;
  icon: string;
  message: string;
  firstCode: number;
  lastCode: number;

  constructor(private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = +params['type']; // (+) converts string 'id' to a number

      switch (this.type) {

        case ErrorType.UNAUTHENTICATED: {
          this.icon = ErrorIcon.UNAUTHENTICATED;
          this.title = ErrorTitle.UNAUTHENTICATED;
          this.message = ErrorMessage.UNAUTHENTICATED;
          break;
        }

        case ErrorType.FOBIDDEN: {
          this.icon = ErrorIcon.FOBIDDEN;
          this.title = ErrorTitle.FOBIDDEN;
          this.message = ErrorMessage.FOBIDDEN;
          break;
        }
        case ErrorType.NOT_FOUND: {
          this.icon = ErrorIcon.NOT_FOUND;
          this.title = ErrorTitle.NOT_FOUND;
          this.message = ErrorMessage.NOT_FOUND;
          break;
        }
        case ErrorType.SERVER_ERROR: {
          this.icon = ErrorIcon.SERVER_ERROR;
          this.title = ErrorTitle.SERVER_ERROR;
          this.message = ErrorMessage.SERVER_ERROR;
          break;
        }
        default: {
          this.router.navigate(['web/error/404']);
          break;
        }
      }

      this.firstCode = +this.type.toString().split('')[0];
      this.lastCode = +this.type.toString().split('')[2];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
