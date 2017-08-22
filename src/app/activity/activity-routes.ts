import { Routes }					from '@angular/router';

import { ActivityComponent }		from './activity/activity.component';
import { ActivityDetailComponent } 	from './activity-detail/activity-detail.component';

export const routes: Routes = [
	{ path: '', component: ActivityComponent },
	{ path: ':id', component: ActivityDetailComponent }
];