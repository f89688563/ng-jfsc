import { NgModule }			from '@angular/core';
import { CommonModule }     from '@angular/common';
import { RouterModule }		from '@angular/router'

import { WeUiModule }       from 'ngx-weui';
import { SwiperComponent }	from './swiper/swiper.component';
import { KfDirective }      from './kf/kf.directive';
import { MyToastComponent } from './my-toast/my-toast.component';
import { MyToastService }	from './my-toast/my-toast.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	imports: 		[ CommonModule, RouterModule, WeUiModule.forRoot() ],
	declarations: 	[ SwiperComponent, KfDirective, MyToastComponent, LoadingComponent ],
	exports: 		[ SwiperComponent, KfDirective, MyToastComponent, LoadingComponent ],
	providers: 		[ MyToastService ],
	entryComponents: [ MyToastComponent ]
})
export class WeuiExtraModule { }