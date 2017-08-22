import { NgModule }						from '@angular/core';
import { CommonModule } 				from '@angular/common';
import { FormsModule }					from '@angular/forms';
import { RouterModule }					from '@angular/router';

import { router }						from './order-router';

import { WeUiModule }             		from 'ngx-weui';
import { CountdownModule } from 'ngx-countdown';

import { OrderConfirmComponent }		from './order-confirm/order-confirm.component';
import { OrderDetialComponent } from './order-detial/order-detial.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WeUiModule.forRoot(),
    RouterModule.forChild(router),
    CountdownModule
  ],
  declarations: [
  	OrderConfirmComponent,
  	OrderDetialComponent,
  	OrderComponent
  ]
})
export class OrderModule { }
