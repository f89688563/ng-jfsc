import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';
import { URLSearchParams }		from '@angular/http';

import {
	DialogService,
	DialogConfig
}								from 'ngx-weui/dialog';
import { ToptipsService }		from 'ngx-weui/toptips';
import { ToastService }			from 'ngx-weui/toast';

import { ApiService }			from '../../shared/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	
	info: any[] = [];
	uid = localStorage.uid;
	cid = localStorage.cid;

	constructor(
		public as: ApiService,
		public ds: DialogService,
		public router: Router,
		public ts: ToastService
	) { }

	ngOnInit() {
		this.loadInfo();
	}

	loadInfo() {
		let params = new URLSearchParams();
		params.set('cid', this.cid);
		this.as.get('member/'+this.uid, params)
				.then( res => {
					this.info = res['info'];
				} )
	}

	// 反馈
	feedback() {
		let config: DialogConfig = {
			title: '反馈',
			confirm: '提交',
			type: 'prompt',
			input: 'textarea',
			inputAttributes: {
	            maxlength: 200,
	            rows: 5
	        }
			// backdrop: true
		};
		this.ds.show(config)
				.subscribe( res => {
					if (res.value && res.result.trim()) {
						let content = res.result.trim(),
							uid = this.uid,
							cid = this.cid;
						this.as.post('member/feedback', {content, uid, cid})
								.then( res => {
									if (res['err_code'] === 0) {
										this.ts.show('已提交');
									} else {
										this.ts.show(res['err_msg'] || '操作异常', 1500, '', 'loading');
									}
								} )
					}
				} )
	}

	// 退出登录
	logout() {
		let config: DialogConfig = {
			title: '提示',
			content: '确定退出？'
		};
		this.ds.show(config).subscribe( res => {
			if (res.value) {
				localStorage.removeItem('uid');
				this.router.navigateByUrl('/user/login');
			}
		} )
	}

	ngOnDestroy() {
        this.ds.destroyAll();
    }
}
