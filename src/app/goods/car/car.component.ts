import { Component, OnInit }				from '@angular/core';
import { URLSearchParams }					from '@angular/http';
import { Router }							from '@angular/router';

import { DialogService, DialogConfig }		from 'ngx-weui/dialog';

import { ApiService }						from '../../shared/api.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
    lists: any[];
    total = 0;
    uid = localStorage.uid;
    cid = localStorage.cid;

  	constructor(
  		public as: ApiService,
  		public ds: DialogService,
  		public router: Router
  	) { }

  	ngOnInit() {
  		this.loadCar();
  	}

  	loadCar() {
  		let params = new URLSearchParams();
  		params.set('uid', this.uid);
  		this.as.get('car', params)
  				.then( res => {
  					return this.lists = res['lists'];
  				} )
  				.then( lists => {
  					if (lists) this.initTotal();
  				} )
  	}

  	// 设置金额
  	initTotal() {
  		this.total = 0.0;
  		this.lists.map( item => {
				if (!item.grid) {
					this.total += item.count * ( item.price * 1000 );
				}
			} )
  		this.total = this.total / 1000;
  	}

  	// 结算
  	toOrder() {
  		let uid = this.uid,
          cid = this.cid
  		this.as.post('order', {uid, cid})
  				.then( res => {
  					if (res['err_code'] === 0) {
  						this.router.navigateByUrl('order/confirm/'+res['id']);
  					}
  				} )
  	}

  	// 增加或减少数量
  	changeCount(item: any, count: number) {
  		let id = item.id;
  		if (item.count <=1 && count < 0) return;
  		this.as.patch('car/'+id, {count})
  				.then( res => {
  					if(res['err_code'] === 0) {
  						item.count += count;
  					}
  				} )
  				.then( res => this.initTotal() )
  	}

  	// 移出购物车
  	del(id: number) {

  		let config: DialogConfig = {
  			title: '提示',
  			content: '确定移出购物车？'
  		}

  		let show = this.ds.show(config);
  		show.subscribe( res => {
  			if (res.value) {
  				this.as.del('car/'+id)
  					.then( res => {
  						if (res['err_code'] === 0) {
  							this.lists = this.lists.filter( item => item.id !== id );
  						}
  					} )
  					.then( res => this.initTotal() )
  			}
  		} )
  	}
}
