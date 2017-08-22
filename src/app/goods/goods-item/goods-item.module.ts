import { NgModule }				from '@angular/core';
import { RouterModule }			from '@angular/router';
import { GoodsItemComponent }	from './goods-item.component';

@NgModule({
	imports: [ RouterModule ],
	declarations: [ GoodsItemComponent ],
	exports: [ GoodsItemComponent ]
})
export class GoodsItemModule { }