import { Component, OnInit } from '@angular/core';

import { URLSearchParams }				from '@angular/http';

import { InfiniteLoaderComponent }    	from 'ngx-weui/infiniteloader';

import { ApiService }					from '../../shared/api.service';

@Component({
  selector: 'app-jf-record',
  templateUrl: './jf-record.component.html',
  styleUrls: ['./jf-record.component.scss']
})
export class JfRecordComponent implements OnInit {

	lists: any[] = [];
	uid = localStorage.uid;
	cid = localStorage.cid;
	jf = 0;
	page = 1;

	constructor(
		public as: ApiService
	) { }

	ngOnInit() {
		this.loadInfo();
		this.onLoadMore();
	}

	loadInfo() {
		let params = new URLSearchParams();
		params.set('cid', this.cid);
		this.as.get('member/'+this.uid, params)
				.then( res => this.jf = res['info']['jf'] )
	}

	onLoadMore(comp?: InfiniteLoaderComponent) {
		let params = new URLSearchParams();
		params.set('uid', this.uid);
		params.set('page', this.page+'');
		this.as.get('record', params)
				.then( res => {
					let lists = res['lists'];
					if (lists.length > 0) {
						lists.map( item => this.lists.push(item) );
						this.page++;
						if (comp) comp.resolveLoading();
					} else {
						if (comp) comp.setFinished();
					}
				} )
	}

}
