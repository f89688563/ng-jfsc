import {
	Directive,
	HostListener,
	Input
}					from '@angular/core';

import {
	DialogService,
	DialogConfig
}					from 'ngx-weui/dialog';

@Directive({
  selector: '[appKf]'
})
export class KfDirective {

	@Input('appKf') phone: string;
	@Input() kf: string;

	config: DialogConfig;

	constructor(
		public ds: DialogService
	) { }

	@HostListener('mouseenter') onMouseEnter() {
		this.config = {
			cancel: '确定',
			confirm: '拨打客服电话',
			content: '<p>您的账号是</p><h3>'+this.phone+'</h3><p>请告知客服</p>'
		}
		this.ds.show(this.config)
				.subscribe( res => {
					if (res.value) {
						window.open('tel://'+this.kf)
					}
				} )
	}

}
