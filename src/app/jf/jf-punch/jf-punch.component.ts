import { Component, OnInit } 	from '@angular/core';
import { URLSearchParams }		from '@angular/http';

import { ToastService }			from 'ngx-weui/toast';

import { ApiService }			from '../../shared/api.service';

@Component({
  selector: 'app-jf-punch',
  templateUrl: './jf-punch.component.html',
  styleUrls: ['./jf-punch.component.scss']
})
export class JfPunchComponent implements OnInit {

	uid = localStorage.uid;
	cid = localStorage.cid;
	info: any = {};
	config: any = {};
	day = 0;
	pre = 0;
	params: any;
	values = [];

	constructor(
		public as: ApiService,
		public ts: ToastService
	) { }

	ngOnInit() {
		this.params = new URLSearchParams();
		this.params.set('cid', this.cid);

		this.loadInfo();
		this.loadPunchInfo();
	}

	loadPunchInfo() {
		this.as.get('punch/'+this.uid, this.params)
				.then( res => {
					this.day = res['day'];
					this.pre = res['pre'];
					this.config = res['config'];
				} )
				.then( () => {
					for( let i=1; i<this.config[1]; i++) {
						this.values.push(i)
					}
				} )
	}

	loadInfo() {
		this.params.set('uid', this.uid);
		this.as.get('member/'+this.uid, this.params)
				.then( res => this.info = res['info'] );
	}

	punch() {
		let uid = this.uid,
			cid = this.cid
		this.as.post('punch', {uid, cid})
				.then( res => {
					if (res['err_code'] === 0) {
						this.ts.show(res['err_msg']).hide
								.subscribe( () => {
									++this.day;
									++this.pre;
									if ( this.day > +this.config[1] ) {
										this.day = 1;
										this.pre = 1;
									}
								} )
					} else {
						this.ts.show(res['err_msg'] || '操作异常', 1500, '', 'loading');
					}
				} )
	}

}
