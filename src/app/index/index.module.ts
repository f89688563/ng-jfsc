import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { RouterModule }               from '@angular/router';

import { routes }                     from './index-routes';
import { WeUiModule }                 from 'ngx-weui';
import { WeuiExtraModule }            from '../common/weui-extra.module';

import { GoodsItemModule }            from '../goods/goods-item/goods-item.module';

import { IndexComponent }             from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    WeUiModule,
    WeuiExtraModule,
    RouterModule.forChild(routes),
    GoodsItemModule
  ],
  declarations: [
  	IndexComponent
  ],
  exports: [
  ],
  providers: [
  ]
})
export class IndexModule { }
