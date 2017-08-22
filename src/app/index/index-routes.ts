import { Routes }						from '@angular/router';

import { IndexComponent }				from './index/index.component';

export const routes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'index/:cid', component: IndexComponent	}
];
// import { NgModule }					from '@angular/core';
// import { RouterModule, Routes}		from '@angular/router';

// import { IndexComponent }			from './index.component';

// const routes: Routes = [
// 	{ path: '', component: IndexComponent },
// 	{ path: 'index/:cid', component: IndexComponent	}
// ];

// @NgModule({
// 	imports: 		[ RouterModule.forChild(routes) ],
// 	exports: 		[ RouterModule ]
// })
// export class HomeRouteModule { }