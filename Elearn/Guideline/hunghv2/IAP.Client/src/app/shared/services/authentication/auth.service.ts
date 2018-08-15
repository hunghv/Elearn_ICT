import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { debug } from 'util';
import { iapConfiguration } from '../../configs/configuration';
import { UserInformation } from '../../models/user.model';
import { UserProfileService } from '../IAP/profile/user-profile.service';

@Injectable()
export class AuthService {
  private manager: UserManager = new UserManager(getClientSettings());
  private userIdentity: User = null;
  private userInformation: UserInformation = null;

  constructor() {
    // this.manager.getUser().then(user => {
    //   this.user = user;
    // });

    if (!this.userIdentity) {
      const userIdentity: string = localStorage.getItem('userIdentity');
      if (userIdentity) {
        this.userIdentity = JSON.parse(userIdentity);
      }

      const userInformation: string = localStorage.getItem('userInformation');
      if (userInformation) {
        this.userInformation = JSON.parse(userInformation);
        if (this.userInformation.listUserRoles == null) {
          this.logOut();
        }
      } else if (userIdentity) {
        this.logOut();
      }
    }
  }

  isLoggedIn(): boolean {
    return this.userIdentity != null && !this.userIdentity.expired;
  }

  logOut(): void {
    const id_token = this.userIdentity.id_token;
    this.userIdentity = null;
    localStorage.removeItem('userInformation');
    localStorage.removeItem('userIdentity');
    // window.location.href = iapConfiguration.
    //   baseIdentityUrl + '/connect/endsession?id_token_hint=' + id_token + '&post_logout_redirect_uri=' + window.location.origin;
    window.location.href =
      `${iapConfiguration.baseIdentityUrl}/connect/endsession?id_token_hint=${id_token}&post_logout_redirect_uri=${window.location.origin}`;
  }

  getToken(): string {
    if (this.userIdentity == null) {
      return null;
    }

    return this.userIdentity.access_token;
  }

  getClaims(): any {
    if (this.userIdentity == null) {
      return null;
    }

    return this.userIdentity.profile;
  }

  getUserName() {
    if (this.userInformation == null) {
      return null;
    }

    return this.userInformation.username;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.userIdentity.token_type} ${this.userIdentity.access_token}`;
  }

  getUserInformation(): UserInformation {
    return this.userInformation;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(callback: UserInformationCallback): Promise<void> {
    return this.manager.signinRedirectCallback().then(userIdentity => {
      localStorage.setItem('userIdentity', JSON.stringify(userIdentity));
      this.userIdentity = userIdentity;

      callback();
    });
  }

  setUserInformation(userInformation): void {
    localStorage.setItem('userInformation', JSON.stringify(userInformation));
    this.userInformation = userInformation;
  }
}

export function getClientSettings(): UserManagerSettings {
  return iapConfiguration.configuration;
}

type UserInformationCallback = () => any;
