import { Component, OnInit } 			from '@angular/core';
import { URLSearchParams }				from '@angular/http';
import { ActivatedRoute }				from '@angular/router';

import { InfiniteLoaderComponent }    	from 'ngx-weui/infiniteloader';

import { ApiService }					from '../../shared/api.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

	lists: any[] = [];
	cid = localStorage.cid;
	page = 1;
	share = 0;

	constructor(
		public as: ApiService,
		public ar: ActivatedRoute
	) { }

	ngOnInit() {
		this.ar.params.subscribe( params => {
			if (params.share) this.share = params.share;
		} )

		this.onLoadMore();
	}

	onLoadMore(comp?: InfiniteLoaderComponent) {
		let params = new URLSearchParams();
		params.set('cid', this.cid);
		params.set('page', this.page+'');
		params.set('share', this.share+'');
		this.as.get('activity', params)
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
