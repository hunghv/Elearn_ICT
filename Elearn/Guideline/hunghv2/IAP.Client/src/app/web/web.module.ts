import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { CoreModule } from '../core/core.module';
import { LayoutComponent } from '../core/layout/layout.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { HttpModule } from '@angular/http';
import { MyTaskComponent } from './my-task/my-task.component';
import { MyTaskContentComponent } from './my-task/my-task-content/my-task-content.component';
import { NgRedux } from '@angular-redux/store';
import { RootState } from './redux/root.state';
import { store } from './redux/root.store';
import { CKEditorModule } from 'ng2-ckeditor';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/web/my-task', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { state: 'dashboard' } },
      {
        path: 'annual-assurance-plan',
        loadChildren: './annual-assurance-plan/annual-assurance-plan.module#AnnualAssurancePlanModule',
        data: { preload: true }
      },
      { path: 'my-task', component: MyTaskComponent, data: { state: 'my-task' } },
      { path: 'error', component: ErrorComponent },
      { path: 'error/:type', component: ErrorComponent },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        data: { preload: true }
      },
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedComponentModule,
    CoreModule,
    DirectivesModule,
    HttpModule,
    CKEditorModule
  ],
  declarations: [
    DashboardComponent,
    ErrorComponent,
    MyTaskComponent,
    MyTaskContentComponent,
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebModule {
  constructor(private ngRedux: NgRedux<RootState>) {
    this.ngRedux.provideStore(store);
  }
}
