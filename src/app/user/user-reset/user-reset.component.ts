import { Component, OnInit } 	from '@angular/core';
import {
	FormGroup,
	Validators,
	FormBuilder
}								from '@angular/forms';
import { Router }				from '@angular/router';

import { ToptipsService }		from 'ngx-weui/toptips';

import { ApiService }			from '../../shared/api.service';

@Component({
  selector: 'app-user-reset',
  templateUrl: './user-reset.component.html',
  styleUrls: ['./user-reset.component.scss']
})
export class UserResetComponent implements OnInit {

	uid = localStorage.uid;
	form: FormGroup;
	info = {
		opsw: '',
		npsw: '',
		cpsw: ''
	};

  	constructor(
  		public fb: FormBuilder,
  		public as: ApiService,
  		public ts: ToptipsService,
  		public router: Router
  	) { }

  	ngOnInit() {
  		this.buildForm();
  	}

  	onSubmit() {
  		let err = this.formErrors;
  		for (let i in err) {
  			if (err[i]) {
  				this.ts.warn(err[i]);
  				return;
  			}
  		}
  		let data = this.form['_value'];
  		if (data.npsw !== data.cpsw) {
  			this.ts.warn('两次输入不一致');
  			return;
  		}
  		this.as.patch('member/'+this.uid, data)
  				.then( res => {
  					if (res['err_code'] === 0) {
  						history.back();
  					} else {
  						this.ts.warn(res['err_msg'] || '操作异常');
  					}
  				} )
  	}

  	buildForm() {
  		this.form = this.fb.group({
  			'opsw': [ this.info.opsw, Validators.required ],
  			'npsw': [ this.info.npsw, Validators.required ],
  			'cpsw': [ this.info.cpsw, Validators.required ]
  		});
  		this.form.valueChanges.subscribe( data => this.onValueChanged() );
  		this.onValueChanged();
  	}

  	onValueChanged() {
  		if (!this.form) return;
  		const form = this.form;

  		for (const field in this.formErrors) {
  			this.formErrors[field] = '';

  			const control = form.get(field)
  			if (control && control.invalid) {
  				const message = this.validationMessages[field];
  				for (const key in control.errors) {
  					this.formErrors[field] += message[key] + ' ';
  				}
  			}
  		}
  	}

  	formErrors = {
  		opsw: '',
  		npsw: '',
  		cpsw: ''
  	};
  	validationMessages = {
  		opsw: { required: '请输入旧密码' },
  		npsw: { required: '请输入新密码'},
  		cpsw: { required: '请确认新密码' }
  	};

}
