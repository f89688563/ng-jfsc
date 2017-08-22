import { Component, OnInit }          from '@angular/core';
import { URLSearchParams }            from '@angular/http';

import { InfiniteLoaderComponent }    from 'ngx-weui/infiniteloader';

import { ApiService }                 from '../../shared/api.service';

@Component({
  	selector: 'app-goods',
  	templateUrl: './goods.component.html',
  	styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

    page = 1;
    cid = localStorage.cid;

  	constructor(public as: ApiService) { }

  	ngOnInit() {
  		this.onLoadMore();
  	}

  	items: any[] = [];

    onLoadMore(comp?: InfiniteLoaderComponent) {
    	let uri = 'goods/lists';
      let params = new URLSearchParams();
      params.set('cid', this.cid);
      params.set('page', this.page+'');

    	this.as.get(uri, params)
    			.then( res => {
    				let lists = res['lists'];
    				if (lists.length > 0) {
              lists.map( item => this.items.push(item) );
    					this.page ++;

    					if (comp) comp.resolveLoading();
    				} else {
    					if (comp) comp.setFinished();
    				}
    			} );
    }

}
