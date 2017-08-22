import { NgModule }						from '@angular/core';
import { CommonModule }					from '@angular/common';
import { RouterModule }					from '@angular/router';
import { FormsModule, ReactiveFormsModule }            		from '@angular/forms';

import { WeuiExtraModule }    from '../common/weui-extra.module';

import { routes }						from './user-routes';
import { UserRegisterComponent }		from './user-register/user-register.component';
import { UserLoginComponent }			from './user-login/user-login.component';
import { UserAddressComponent } 		from './user-address/user-address.component';
import { AddressEditComponent } from './user-address/address-edit/address-edit.component';
import { UserComponent } from './user/user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserResetComponent } from './user-reset/user-reset.component';
import { UserAboutComponent } from './user-about/user-about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WeuiExtraModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  	UserRegisterComponent,
  	UserLoginComponent,
  	UserAddressComponent,
  	AddressEditComponent,
  	UserComponent,
    UserInfoComponent,
    UserResetComponent,
    UserAboutComponent
  ]
})
export class UserModule { }
