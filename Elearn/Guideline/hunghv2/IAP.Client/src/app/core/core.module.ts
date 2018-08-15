import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ExceptionComponent } from './exception/exception.component';
import { AppComponent } from './app/app.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './layout/nav-bar/side-bar/side-bar.component';
import { TopBarComponent } from './layout/nav-bar/top-bar/top-bar.component';
import { ProfileMenuComponent } from './layout/nav-bar/top-bar/profile-menu/profile-menu.component';
import { NotificationMenuComponent } from './layout/nav-bar/top-bar/notification-menu/notification-menu.component';
import { MaterialModule } from '../shared/components/common/material.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    ExceptionComponent,
    AppComponent,
    LayoutComponent,
    NavBarComponent,
    SideBarComponent,
    TopBarComponent,
    ProfileMenuComponent,
    NotificationMenuComponent,
  ],
  exports: [
    LoginComponent,
    ExceptionComponent,
    AppComponent,
    LayoutComponent,
    NavBarComponent,
    SideBarComponent,
    TopBarComponent,
    ProfileMenuComponent,
    NotificationMenuComponent,
  ],
})
export class CoreModule { }
