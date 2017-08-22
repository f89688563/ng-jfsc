import { Component, OnInit }					 from '@angular/core';
// import { FormControl, FormGroup, Validators }	from '@angular/forms';
import { URLSearchParams }						 from '@angular/http';
import { Router }								       from '@angular/router';
import { PopIn }                       from '../../shared/animations/pop-in';

import { ApiService }							     from '../../shared/api.service';

import { ToastService }							   from "ngx-weui/toast";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations: [PopIn]
})
export class UserLoginComponent implements OnInit {

    user = { user: '18674083822', psw: '123456' };

  	constructor(
  		public as: ApiService,
  		public ts: ToastService,
  		public router: Router
  	) { }

  	ngOnInit() {
  		let uid = localStorage.getItem('uid');
  		if(uid) {
  			this.router.navigateByUrl('');
  		}
  	}

  	onSave() {
  		let params = new URLSearchParams();
  		params.set('user', this.user.user);
  		params.set('psw', this.user.psw);
  		this.as.get('member/login', params)
  				.then( res => {
  					if(res['err_code'] === 0) {
  						localStorage.setItem('user', res['info']);
              localStorage.setItem('uid', res['info']['id']);
              history.back();
  						// this.router.navigateByUrl('/index');
  					} else {
  						this.ts['loading'](res['err_msg'] || '登陆异常')
  					}
  				} )
  	}

}
