import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }					from '@angular/forms';
import { RouterModule }	from '@angular/router';

import { WeUiModule }             		from 'ngx-weui';
import { WeuiExtraModule }            from '../common/weui-extra.module';
import { router }		from './jf-router';

import { JfGainComponent } from './jf-gain/jf-gain.component';
import { JfPunchComponent } from './jf-punch/jf-punch.component';
import { JfRecordComponent } from './jf-record/jf-record.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WeUiModule.forRoot(),
    RouterModule.forChild(router),
    WeuiExtraModule
  ],
  declarations: [
  	JfGainComponent,
  	JfPunchComponent,
  	JfRecordComponent
  ]
})
export class JfModule { }
