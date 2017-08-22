import { Routes }					from '@angular/router';

import { GoodsComponent }			from './goods/goods.component';
import { GoodsInfoComponent }		from './goods-info/goods-info.component';
import { CarComponent }				from './car/car.component';

export const routes: Routes = [
	{
		path: '',
		component: GoodsComponent,
		children: [
			{ path: 'goods', component: GoodsComponent }
		]
	},
	{ path: 'car', component: CarComponent },
	{ path: ':id', component: GoodsInfoComponent }
];