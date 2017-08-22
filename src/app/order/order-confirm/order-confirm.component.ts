import { Component, OnInit, ViewChild }	from '@angular/core';
import { ActivatedRoute, Router }		from '@angular/router';
import { URLSearchParams }				from '@angular/http';

import { ToastService }					from 'ngx-weui/toast';

import { ApiService }					from '../../shared/api.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
	id = '';
	aid = 0;
	uid = localStorage.uid;
	cid = localStorage.cid;
	info: any[] = [];
	address: any[] = [];
	fare = 0;
	scale = 0;
	payType = 0;
	stores: any[] = [];
	selectedStore = 0;

	payOptions: any[] = [
		{ id: 0, name: '微信支付', img: 'assets/images/Order/wei.png' },
		{ id: 1, name: '门店自提', img: 'assets/images/Order/pay.png' },
	];

	constructor(
		public ar: ActivatedRoute,
		public as: ApiService,
		public router: Router,
		public ts: ToastService
	) { }

	ngOnInit() {
		this.ar.params.subscribe( params => {
			this.id = params.id;
			this.aid = params.aid;
		});
		this.hasAddress();
		this.loadInfo();
		this.loadExtra();
	}

	// 检查是否有保存地址信息
	hasAddress() {
		console.log(1)
	}

	// 提交订单
	confirm() {
		let data = {};
		switch(this.payType) {
			case 0:
				if (!this.aid) {
					this.ts.loading('未设置收货地址');
					return ;
				}
				data = { aid: this.aid };
				break;
			case 1:
				if (!this.selectedStore) {
					this.ts.loading('请选择门店');
					return ;
				}
				data = { sid: this.selectedStore };
				break;
		}

		data = Object.assign(data, {cid: this.cid});
		let loading = this.ts.loading('生成订单...', 3000);
		
		this.as.put('order/'+this.id, data)
				.then( res => {
					loading._showd = false;
					this.ts.success('ok', 500).hide
							.subscribe( () => this.router.navigateByUrl('/order/'+this.id) );
				} )
	}

	// 加载订单信息
	loadInfo() {
		this.as.get('order/'+this.id)
				.then( res => {
					if (res['info']['status']) {
						this.ts.loading('非法进入', 800).hide.subscribe( () => history.back() );
					} else {
						this.info=res['info']
					}
				} )
	}

	// 加载额外信息
	loadExtra() {
		let params = new URLSearchParams();
		params.set('uid', this.uid);
		params.set('cid', this.cid);
		this.as.get('order/extra', params)
				.then( res => {
					this.fare = res['fare'];
					this.scale = res['scale'];
					this.stores = res['stores'];
					this.selectedStore = this.stores[0]['id'];
					this.address = res['address'];
				} )
				.then( () => {
					if (this.aid) {
						this.as.get('address/'+this.aid)
								.then( res => this.address = res['info'] );
					} else if(this.address) {
						this.aid = this.address['id'];
					}
				} )
	}

}
