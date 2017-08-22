import { Router }					from '@angular/router';

import { OrderConfirmComponent }	from './order-confirm/order-confirm.component';
import { OrderDetialComponent } 	from './order-detial/order-detial.component';
import { OrderComponent } 			from './order/order.component';

export const router = [
	{ path: '', component: OrderComponent },
	// { path: 'type/:type', conponent: OrderComponent },
	{ path: 'confirm/:id', component: OrderConfirmComponent },
	{ path: 'confirm/:id/:aid', component: OrderConfirmComponent },
	{ path: ':id', component: OrderDetialComponent }
];