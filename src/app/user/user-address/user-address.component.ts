import { Component, OnInit } 	from '@angular/core';
import { URLSearchParams }		from '@angular/http';
import {
	Router,
	ActivatedRoute
}								from '@angular/router';

import {
	DialogService,
	DialogConfig
}								from 'ngx-weui/dialog';

import { ApiService }			from '../../shared/api.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
	lists: any[] = [];
	uid = localStorage.uid;
	oid = '';

  	constructor(
  		public as: ApiService,
  		public ds: DialogService,
  		public router: Router,
  		public ar: ActivatedRoute
  	) { }

  	ngOnInit() {
  		this.ar.params.subscribe( params => this.oid = params.oid );
  		this.loadLists();
  	}

  	navigateTo(id: number) {
  		if (this.oid) {
  			this.router.navigateByUrl('/order/confirm/'+this.oid+'/'+id);
  		}
  	}

  	// 删除
  	del(id: number, $event: Event) {
  		$event.stopPropagation();

  		let config: DialogConfig = {
  			title: '提示',
  			content: '确定删除该地址？'
  		}

  		this.ds.show(config)
  				.subscribe( res => {
  					if (res.value) {
  						this.as.del('address/'+id)
  								.then( res => {
  									this.lists = this.lists.filter( item => item.id !== id )
  								} )
  					}
  				} )
  	}

  	edit(id: number, $event: Event) {
  		$event.stopPropagation();
  		this.router.navigateByUrl('/user/address/edit/'+id);
  	}

  	loadLists() {
  		let params = new URLSearchParams();
  		params.set('uid', this.uid);
  		this.as.get('address', params)
  				.then( res => this.lists = res['lists'] );
  	}

}
