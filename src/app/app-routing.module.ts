import { NgModule }					from '@angular/core';
import { RouterModule, Routes}		from '@angular/router';

import { IndexComponent }			from './index/index/index.component';
import { PageNotFoundComponent } 	from './page-not-found/page-not-found.component';

const routes: Routes = [
	// { path: 'index', component: IndexComponent },
	{ path: 'index', loadChildren: './index/index.module#IndexModule' },
	{ path: 'goods', loadChildren: './goods/goods.module#GoodsModule' },
	{ path: 'user', loadChildren: './user/user.module#UserModule' },
	{ path: 'order', loadChildren: './order/order.module#OrderModule' },
	{ path: 'jf', loadChildren: './jf/jf.module#JfModule' },
	{ path: 'activity', loadChildren: './activity/activity.module#ActivityModule' },
	{ path: 'act', loadChildren: './act/act.module#ActModule' },
	{ path: ':cid', loadChildren: './index/index.module#IndexModule' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: 		[ RouterModule.forRoot(routes) ],
	exports: 		[ RouterModule ]
})
export class AppRoutingModule { }