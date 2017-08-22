import { Routes }					from '@angular/router';

import { JfGainComponent } 			from './jf-gain/jf-gain.component';
import { JfPunchComponent } 		from './jf-punch/jf-punch.component';
import { JfRecordComponent } 		from './jf-record/jf-record.component';

export const router: Routes = [
	{ path: '', component: JfGainComponent },
	{ path: 'punch', component: JfPunchComponent },
	{ path: 'record', component: JfRecordComponent }
];