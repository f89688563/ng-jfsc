import { Component, OnInit } 			from '@angular/core';
import { URLSearchParams }				from '@angular/http';

import { InfiniteLoaderComponent }    	from 'ngx-weui/infiniteloader';

import { ApiService }					from '../../shared/api.service';

@Component({
  selector: 'app-act-record',
  templateUrl: './act-record.component.html',
  styleUrls: ['./act-record.component.scss']
})
export class ActRecordComponent implements OnInit {

	lists: any[] = [];
	uid = localStorage.uid;
	page = 1;

	constructor(
		public as: ApiService
	) { }

	ngOnInit() {
		this.onLoadMore();
	}

	onLoadMore(comp?: InfiniteLoaderComponent) {
		let params = new URLSearchParams();
		params.set('uid', this.uid);
		params.set('page', this.page+'');
		this.as.get('gift/record', params)
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
