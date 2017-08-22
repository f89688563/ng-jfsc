import { Component, OnInit }	from '@angular/core';
import { 
	FormGroup,
	FormBuilder,
	Validators
}								from '@angular/forms';
import {
	Router,
	ActivatedRoute
}								from '@angular/router';

import { PickerService }		from 'ngx-weui/picker';
import { ToptipsService } 		from "ngx-weui/toptips";

import { DATA }					from '../cn';
import { ApiService }			from '../../../shared/api.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent implements OnInit {

	uid = localStorage.uid;
	oid = '';
	id = 0;
	info: any[] = [];
	city = '';
	value = '110101';
	on_time = '周一至周五';
	timeData = [
		'周一至周五',
		'周末',
		'不限制'
	];
	pickerOptions = {
		cancel: '取消',
		confirm: '确定',
		backdrop: true
	};

	form: FormGroup;

  	constructor(
  		public ps: PickerService,
  		public fb: FormBuilder,
  		public ts: ToptipsService,
  		public as: ApiService,
  		public router: Router,
  		public ar: ActivatedRoute
  	) { }

  	ngOnInit() {
  		this.ar.params.subscribe( params => {
  			this.id = params.id;
  			this.oid = params.oid;
  			if (this.id) {
  				this.loadInfo();
  			}
  		} );
		this.initForm();
  	}

  	loadInfo() {
  		this.as.get('address/'+this.id)
  				.then( res => {
  					let info = res['info'];
  					info['city'] = info['province'] + ' ' + info['city'] + ' ' + info['district'];
  					this.info = info;
  					this.value = info['code'];
  					this.on_time = info['on_time'];
  				} )
  				.then( res => this.initForm() )
  	}

  	// 选择送货时间
  	selectTime() {
  		this.ps.show(this.timeData, this.on_time, [], this.pickerOptions)
  				.subscribe( res => this.on_time = res.value )
  	}

  	// 选择城市
  	selectCity() {
  		this.ps.showCity(DATA, this.value)
  				.subscribe( res => {
		  			let items = res.items,
		  				city = '';
		  			items.map( item => {
		  				city += item.name + ' ';
		  			} );
		  			this.city = city.trim();
		  			this.value = res.value;
		  		} )
  	}

  	// 提交
  	onSubmit() {
  		let err = this.formErrors;
  		for (let i in err) {
  			if (err[i]) {
  				this.ts.warn(err[i]);
  				return false;
  			}
  		}
  		let data = this.form['_value'];
  		data['uid'] = this.uid;
  		data['code'] = this.value;

  		if (this.id) {
  			this.as.put('address/'+this.id, data)
  					.then( res => this.doRes(res) )
  		} else {
  			this.as.post('address', data)
  					.then( res => this.doRes(res) )
  		}
  	}

  	doRes(res: any[]) {
		if (res['err_code'] === 0) {
			history.back();
			// let url = this.oid ? 'order/confirm/'+this.oid : 'user/address';
			// this.router.navigateByUrl(url);
		} else {
			this.ts.warn(res['err_msg'] || '操作异常');
		}
  	}

  	// 初始化表单验证
  	initForm() {
  		this.form = this.fb.group({
  			'username': [ this.info['username'], [ 
	  						Validators.required,
	  						Validators.minLength(2),
	  						Validators.maxLength(8)
		  				] ],
  			'phone': 	[ this.info['phone'], [
  							Validators.required,
  							Validators.pattern(/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/)
  						] ],
  			'on_time': 	[ this.info['on_time'], Validators.required ],
  			'city': 	[ this.info['city'], Validators.required ],
  			'detail': 	[ this.info['detail'], [
  							Validators.required,
  							Validators.minLength(5),
  							Validators.maxLength(16)
  						] ]
  		})
  		this.form.valueChanges.subscribe( data => this.onValueChanged(data) );
  		this.onValueChanged();
  	}

  	onValueChanged(data?: any) {
		if (!this.form) return;
		const form = this.form;

		for(const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);

			if (control && control.invalid) {
				const messages = this.validationMessages[field];
				for(const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	formErrors = {
		'username': '',
		'phone': '',
		'on_time': '',
		'city': '',
		'detail': ''
	};

	validationMessages = {
		'username': {
			'required': '请输入收货人姓名',
			'minlength': '收货人姓名长度不得少于2',
			'maxlength': '收货人姓名长度不得超过8'
		},
		'phone': {
			'required': '请输入手机号',
			'pattern': '请输入正确的手机号'
		},
		'on_time': {
			'required': '请选择收货时间'
		},
		'city': {
			'required': '请选择城市'
		},
		'detail': {
			'required': '请输入详细地址',
			'minlength': '详细地址长度不得少于5',
			'maxlength': '详细地址长度不得超过16'
		}
	};
}
