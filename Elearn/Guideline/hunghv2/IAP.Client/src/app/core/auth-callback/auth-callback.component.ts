import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/authentication/auth.service';
import { BackgroundLoader } from '../../shared/services/background-loader/background-loader.service';
import { UserProfileService } from '../../shared/services/IAP/profile/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'iap-app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService,
    private userProfileService: UserProfileService,
    private router: Router,
    private loader: BackgroundLoader) { }

  ngOnInit() {
    this.loader.show();
    this.authService.completeAuthentication(this.getUserInformation.bind(this));
  }

  getUserInformation(authService, userProfileService): void {
    this.userProfileService.getUserInformation().subscribe(
      data => {
        this.authService.setUserInformation(data);
        this.router.navigateByUrl('/');
      },  // success path
      error => {
        debugger;
        //TODO: ThienDD3 - uncomment when release
        // api is off or not found user
        // authService.logOut();
      } // error path
    );
  }
}
