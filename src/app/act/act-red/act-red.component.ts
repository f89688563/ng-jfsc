import { Component, OnInit } 	from '@angular/core';
import {
	trigger,
	state,
	style,
	transition,
	animate,
	keyframes
}								from '@angular/animations';

import { ToastService }			from 'ngx-weui/toast';

import { ApiService }			from '../../shared/api.service';

@Component({
  selector: 'app-act-red',
  templateUrl: './act-red.component.html',
  styleUrls: ['./act-red.component.scss'],
  animations: [
  	trigger('pieceIn', [
  		state('void', style({display: 'none'})),
  		// state('in', style({display: 'block'})),
  		transition(':enter', [
  			animate(300, keyframes([
  				style({ opacity: 0,	transform: 'rotateY(270deg)',	offset: 0 }),
  				style({ opacity: 1,	transform: 'rotateY(300deg)',	offset: 0.7 }),
  				style({ opacity: 1,	transform: 'rotateY(360deg)',	offset: 1.0 }),
  			]))
  		]),
  		transition(':leave', [
  			animate(300, keyframes([
  				style({ opacity: 1,	transform: 'rotateY(0)',		offset: 0 }),
  				style({ opacity: 1,	transform: 'rotateY(60deg)',	offset: 0.3 }),
  				style({ opacity: 0,	transform: 'rotateY(90deg)',	offset: 1.0 }),
  			]))
  		])
  	])
  ]
})
export class ActRedComponent implements OnInit {

	cid = localStorage.cid;
	uid = localStorage.uid;
	opened = false;
	sub = '继续努力';
	special = '谢谢参与';
	pieceIn = '';

	constructor(
		public as: ApiService,
		public ts: ToastService
	) { }

	ngOnInit() {
	}

	// 动画完成回调
	animationDone() {
		if (this.pieceIn === 'void') {
			this.opened = false;
		}
	}

	open() {
		let uid = this.uid,
			cid = this.cid
		this.as.post('gift/red', {uid, cid})
				.then( res => {
					if (res['err_code'] ===0) {
						if (res['info']['name']) {
							this.sub = '恭喜中奖';
							this.special = res['info']['name'] +' x1';
						}
						// 打开动画
						this.opened = true;
						this.pieceIn = 'in';
					} else {
						this.ts.loading(res['err_msg']||'操作异常');
					}
				} )
	}

}
