import { Component, OnInit }	from '@angular/core';
import { URLSearchParams }		from '@angular/http';
import { ActivatedRoute }		from '@angular/router';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	keyframes
}								from '@angular/animations';

import { ApiService }			from '../../shared/api.service';
import { ToastService }			from "ngx-weui/toast";

@Component({
  selector: 'app-goods-info',
  templateUrl: './goods-info.component.html',
  styleUrls: ['./goods-info.component.scss'],
  animations: [
  	trigger('animation', [
  		state('active', style({display: 'none'})),
  		state('void', style({display: 'none'})),
  		transition('* => void', [
  			animate(1000, keyframes([
		        style({opacity: 1, left: '60%', bottom: '40px', offset: 0, transform: 'scale(1.0)'}),
		        style({opacity: 1, left: '50%', bottom: '80px', offset: 0.25, transform: 'scale(1.2)'}),
		        style({opacity: 1, left: '40%', bottom: '115px', offset: 0.5, transform: 'scale(1.5)'}),
		        style({opacity: 1, left: '30%', bottom: '80px', offset: 0.75, transform: 'scale(1.2)'}),
		        style({opacity: 0, left: '20%', bottom: '35px', offset: 1.0, transform: 'scale(1.0)'})
		    ]))
  		]),
  	])
  ]
})
export class GoodsInfoComponent implements OnInit {

	info = {};
	corver: any[] = [];
	_standards: any[] = [];
	standard;
	carCount = 0;
	goodsCount = 1;
	praised = 0;
	uid = localStorage.uid;
	cid = localStorage.cid;
	animationShow = '';
	logo = '';
	hasToCar = false;

	constructor(public as: ApiService, public ar: ActivatedRoute, public ts: ToastService) { }

	ngOnInit() {
		this.ar.params.subscribe( params => {
			let id = params['id'];
			this.loadInfo(id);
			this.loadExtra(id);
		} );
	}

	// 加载商品信息
	loadInfo(id: number|string) {
		let params = new URLSearchParams();
		params.set('cid', this.cid);
		params.set('id', id+'');

		this.as.get('goods/info', params)
				.then( res => {
					this.standard = res['standard'];
					return this.info = res['info'];
				} )
				.then( res => {
					let _standards = res['_standard'];
					if (_standards) {
						for (var i in _standards) {
							if (_standards[i] == undefined) continue;
							// 初始化选项
							for ( var id in _standards[i]) {
								if (id === '0') {
									_standards[i][id]['active'] = true;
								} else {
									_standards[i][id]['active'] = false;
								}
							}

							if (this._standards[i]) {
								this._standards[i].push(_standards[i]);
							} else {
								this._standards[i] = _standards[i];
							}

						}
					}

					let corver = res['logo'];
					if (typeof(corver) == 'string') {
						corver = corver.split(' ')
					}
					this.logo = corver[0];
					corver.map( item => this.corver.push({corver: item, id: 1}) )
				} );
	}

	// 加载其他信息
	loadExtra(id: number|string) {
		let uri = 'goods/extra';
		let params = new URLSearchParams();
		params.set('gid', id+'');
		params.set('uid', this.uid+'')

		this.as.get(uri, params)
				.then( res => {
					this.praised = res['praised'];
					this.carCount = +res['carCount'];
				} );
	}

	// 点赞
	praise() {
		let gid = this.info['id'],
			uid = this.uid,
			cid = this.cid;
		this.as.put('goods/praise', {gid, uid, cid})
				.then( res => {
					if(res['err_code'] === 0) {
						if (this.praised === 1) {
							this.praised = 0;
							this.info['praise'] --;
						} else {
							this.praised = 1;
							this.info['praise'] ++;
						}
					}
				} )
	}

	// 动画完成
	animationDone() {
		// 重置动画
		this.animationShow = 'active';
		// 更新购物车数量
		if (this.hasToCar) {
			this.carCount += this.goodsCount;
			this.hasToCar = false;
		}
	}

	// 加入购物车
	toCar() {
		// 获取选中的属性
		let gid = this.info['id'],
			count = this.goodsCount,
			detailArr = [], sidsArr = [], standardArr = [];
		this._standards.map( item => {
			item.map( sub => {
				if (sub.active === true) {
					detailArr.push( [ sub['pid'] + ':' + sub['sid'] ] );
					sidsArr.push( [ sub['id'] ] );
					standardArr.push( this.standard[sub['sid']]['name'] )
				}
			} )
		} )
		
		let detail = detailArr.join(','),
			sids = sidsArr.join(','),
			standard = standardArr.join(' '),
			uid = this.uid,
			cid = this.cid;

		// 请求
		this.as.post('car', {gid, detail, sids, standard, count, uid, cid})
				.then( res => {
					if (res['err_code'] === 0) {
						this.animationShow = 'void';
						this.hasToCar = true;
					} else {
						this.ts.loading(res['err_msg']||'操作异常');
					}
				} )
	}

	// 选择类型
	selectType(item: any, i: string) {
		this._standards[i].map( _standard => {
			if (_standard.id === item.id) {
				_standard['active'] = true;
			} else {
				_standard['active'] = false;
			}
		} )
	}

	// 数量变化
	changeCount(type: string) {
		switch(type) {
			case "incr":
				this.goodsCount ++;
				break;
			case "decr":
				if (this.goodsCount <= 1) return;
				this.goodsCount --;
				break;
		}
	}

}
