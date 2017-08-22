import { Routes }				from '@angular/router';

import { ActRedComponent } 		from './act-red/act-red.component';
import { ActRecordComponent } from './act-record/act-record.component';

export const routes: Routes = [
	{ path: 'red', component: ActRedComponent },
	{ path: 'record', component: ActRecordComponent }
];