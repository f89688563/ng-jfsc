import { Component, OnInit }			from '@angular/core';
import { URLSearchParams }				from '@angular/http';
import { ActivatedRoute }         from '@angular/router';

import {
	InfiniteLoaderComponent,
	InfiniteLoaderConfig
}    	from 'ngx-weui/infiniteloader';

import { ApiService }					from '../../shared/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    lists: any[] = [];
    status: any[] = [];
    page = 1;
    params: any;
    uid = localStorage.uid;
    time = 0;
    config: InfiniteLoaderConfig = {
      height: '100vh',
      percent: 90,
		// loading: '',
		// finished: '',
		// throttle: 0		// 滚动节流时长（单位：ms）
    };

  	constructor(
      public as: ApiService,
      public ar: ActivatedRoute
  	) { }

  	ngOnInit() {

      this.ar.params.subscribe( params => this.params = params )
      
      let date = new Date();
      this.time = date.valueOf() / 1000;

  		this.onLoadMore();
  	}

    pay(item: any[]) {
      let status = 'send';
      this.as.patch('order/'+item['id'], {status})
              .then( res => {
                if (res['err_code'] === 0) {
                  item['status'] = status;
                }
              } )
    }

    notify(item: any[]) {
      let currentStatus = item['status'],
          status = '';

      switch(currentStatus) {
        case 'wait':
          status = 'cancel';
          break;
        case 'sending':
          status = 'ok';
          break;
      }
      this.as.patch('order/'+item['id'], {status})
            .then( res => {
              if (res['err_code'] === 0) {
                item['status'] = status;
              }
            } )
    }

  	onLoadMore(comp?: InfiniteLoaderComponent) {
  		let params = new URLSearchParams();
  		params.set('uid', this.uid);
  		params.set('page', this.page+'')
      if (this.params.type) params.set('type', this.params.type);
  		this.as.get('order', params)
  				.then( res => {
  					if (res['lists'].length > 0) {
  						this.status = res['status'];
	  					res['lists'].map( item => this.lists.push( item ) )
	  					this.page ++;
	  					if (comp) comp.resolveLoading();
  					} else {
  						if (comp) comp.setFinished();
  					}
  				} )
  	}

}
