import { Routes }						from '@angular/router';

import { UserLoginComponent }			from './user-login/user-login.component';
import { UserRegisterComponent }		from './user-register/user-register.component';
import { UserAddressComponent }			from './user-address/user-address.component';
import { AddressEditComponent }       	from './user-address/address-edit/address-edit.component';
import { UserComponent } 				from './user/user.component';
import { UserInfoComponent } 			from './user-info/user-info.component';
import { UserResetComponent } 			from './user-reset/user-reset.component';
import { UserAboutComponent } 			from './user-about/user-about.component';


export const routes: Routes = [
	{ path: '', component: UserComponent },
	{ path: 'login', component: UserLoginComponent },
	{ path: 'info', component: UserInfoComponent },
	{ path: 'about', component: UserAboutComponent },
	{ path: 'reset', component: UserResetComponent },
	{ path: 'register', component: UserRegisterComponent },
	{ path: 'address', component: UserAddressComponent },
	{ path: 'address/oid/:oid', component: UserAddressComponent },
	{ path: 'address/edit', component: AddressEditComponent },
	{ path: 'address/edit/:id', component: AddressEditComponent },
	{ path: 'address/edit/oid/:oid', component: AddressEditComponent }
];