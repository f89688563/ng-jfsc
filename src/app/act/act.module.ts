import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }		from '@angular/router';
import { FormsModule }		from '@angular/forms';

import { WeUiModule }                 from 'ngx-weui';

import { WeuiExtraModule }            from '../common/weui-extra.module';
import { routes }			from './act-routes';

import { ActRedComponent } from './act-red/act-red.component';
import { ActRecordComponent } from './act-record/act-record.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WeUiModule.forRoot(),
    WeuiExtraModule
  ],
  declarations: [ActRedComponent, ActRecordComponent]
})
export class ActModule { }
