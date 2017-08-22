import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterModule }			        from '@angular/router';

import { WeUiModule }               from 'ngx-weui';
import { WeuiExtraModule }          from '../common/weui-extra.module';

import { routes }                   from './goods-route';

import { GoodsComponent }           from './goods/goods.component';
import { GoodsItemModule }          from './goods-item/goods-item.module';
import { GoodsInfoComponent }       from './goods-info/goods-info.component';

import { ArrayPipe }                from '../common/array.pipe';
import { CarComponent } from './car/car.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WeUiModule,
    WeuiExtraModule,
    GoodsItemModule
  ],
  declarations: [
  	GoodsComponent,
  	GoodsInfoComponent,ArrayPipe, CarComponent
  ]
})
export class GoodsModule { }
