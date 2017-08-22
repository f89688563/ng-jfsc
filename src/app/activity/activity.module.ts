import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }	from '@angular/forms';
import { RouterModule }	from '@angular/router';

import { WeUiModule }                 from 'ngx-weui';
import { WeuiExtraModule }            from '../common/weui-extra.module';
import { routes }                     from './activity-routes';

import { ActivityComponent } from './activity/activity.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    WeuiExtraModule,
    WeUiModule.forRoot()
  ],
  declarations: [
  	ActivityComponent,
  	ActivityDetailComponent
  ]
})
export class ActivityModule { }
