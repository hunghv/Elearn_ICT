import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule } from '@angular-redux/store';


import { CoreModule } from './core/core.module';
import { ServicesModule } from './shared/services/services.module';
import { SharedComponentModule } from './shared/components/shared-component.module';
import { AppComponent } from './core/app/app.component';
import { LoginComponent } from './core/login/login.component';
import { WebModule } from './web/web.module';
import { LayoutComponent } from './core/layout/layout.component';
import { DirectivesModule } from './shared/directives/directives.module';
import { HelperModule } from './shared/helper/helper.module';
import { InterceptorsModule } from './shared/interceptors/interceptors.module';
import { CustomPreloadingStrategy } from './core/custom-preloading/custom-preloading';
import { AuthService } from '../app/shared/services/authentication/auth.service';
import { AuthGuardService } from '../app/shared/services/authentication/auth-guard.service';
import { AuthCallbackComponent } from '../app/core/auth-callback/auth-callback.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'web',
    component: LayoutComponent,
     canActivate: [AuthGuardService],
    loadChildren: './web/web.module#WebModule',
    data: { preload: true }
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '**',
    redirectTo: '/web/dashboard'
  }
];

@NgModule({
  declarations: [
    AuthCallbackComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    NgReduxModule,

    HelperModule,
    ServicesModule.forRoot(),
    InterceptorsModule,
    CoreModule,
    DirectivesModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuardService,
    AuthService,
    CustomPreloadingStrategy
  ]
})
export class AppModule { }
