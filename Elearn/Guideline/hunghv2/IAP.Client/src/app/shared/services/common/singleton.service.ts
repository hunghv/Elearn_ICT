import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { debug } from 'util';

@Injectable()
export class SingletonService {
  public assurancePlanTabId: number = 0;

  constructor() {

  }

}