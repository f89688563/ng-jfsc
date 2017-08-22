import { Component, OnInit }					 from '@angular/core';
// import { FormControl, FormGroup, Validators }	from '@angular/forms';
import { URLSearchParams }						 from '@angular/http';
import { Router }								       from '@angular/router';

import { ToastService }							   from "ngx-weui/toast";
import { PickerService }               from 'ngx-weui/picker';

import { PopIn }                       from '../../shared/animations/pop-in';
import { ApiService }                  from '../../shared/api.service';
import { DATA }                        from '../user-address/cn';
import { MyToastService }              from '../../common/my-toast/my-toast.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  animations: [PopIn]
})
export class UserRegisterComponent implements OnInit {

    user = {
      cid: localStorage.cid,
      sid: '',
      pid: '',
      username: '',
      phone: '',
      psw: '',
      mobile: '',
      gender: '',
      birthtype: 0,
      birthday: '',
      province: '',
      city: '',
      district: '',
      address: '',
      code: '110101',
      remark: ''
    };
    citys = '';
    stores: any[] = [];
    employs: any[] = [];
    mobile_type: any[] = [];
    cid = localStorage.cid;

  	constructor(
  		public as: ApiService,
  		public ts: ToastService,
  		public router: Router,
      public ps: PickerService,
      public mts: MyToastService
  	) { }

  	ngOnInit() {

      if (localStorage.uid > 0) {
        this.router.navigateByUrl('');
      }

      this.loadStores();
    }

    loadStores() {
      let params = new URLSearchParams();
      params.set('cid', this.cid);
      this.as.get('member/stores', params)
              .then( res => {
                this.mobile_type = res['mobile_type'];
                return this.stores = res['stores'] || [];
              } )
              .then( stores => {
                this.selectStore(stores[0]['id'])
              } )
    }

    selectStore(sid?: string) {
      if (sid) this.user.sid = sid;
      let params = new URLSearchParams();
      params.set('sid', this.user.sid);
      this.as.get('member/employs', params)
              .then( res => {
                this.employs = res['lists'] || [];
                // this.user.pid = this.employs[0]['id'] || '';
                // console.log(this.user)
              } )
    }

    // 选择城市
    selectCity() {
      this.ps.showCity(DATA, this.user.code)
          .subscribe( res => {
            let items = res.items,
              city = '';
            items.map( item => {
              city += item.name + ' ';
            } );
            this.citys = city.trim();
            this.user.code = res.value;
          } )
    }

  	onSave() {
      // console.log(this.user)
      let city = this.citys.split(' ');
      this.user.province = city[0];
      this.user.city = city[1];
      this.user.district = city[2];
      this.user.birthtype = this.user.birthtype ? 1 : 0;
      this.as.post('member', this.user)
              .then( res => {
                if (res['err_code'] === 0) {
                  localStorage.uid = res['id'];
                  history.back();
                } else {
                  this.mts.show(res['err_msg']||'注册失败');
                }
              } )
      // this.code = this.value;
      // console.log(this.user);
  		// let params = new URLSearchParams();
  		// params.set('user', this.user.user);
  		// params.set('psw', this.user.psw);
  		// this.as.get('member/login', params)
  		// 		.then( res => {
  		// 			if(res['err_code'] === 0) {
  		// 				localStorage.setItem('user', res['info']);
    //           localStorage.setItem('uid', res['info']['id']);
  		// 				// this.router.navigateByUrl('/index');
  		// 			} else {
  		// 				this.ts['loading'](res['err_msg'] || '登陆异常')
  		// 			}
  		// 		} )
  	}

}
