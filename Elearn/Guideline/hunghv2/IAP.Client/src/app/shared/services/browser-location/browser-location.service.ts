import { Injectable } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

@Injectable()
export class BrowserLocationService extends Location {

  constructor(platformStrategy: LocationStrategy) {
    super(platformStrategy);
  }

}
