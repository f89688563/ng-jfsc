import { Component, OnInit }	from '@angular/core';
import {
	ActivatedRoute
}								from '@angular/router';

import { ApiService }			from '../../shared/api.service';

@Component({
  selector: 'app-order-detial',
  templateUrl: './order-detial.component.html',
  styleUrls: ['./order-detial.component.scss']
})
export class OrderDetialComponent implements OnInit {
    info: any[] = [];
    id = '';
    config = {};

  	constructor(
  		public ar: ActivatedRoute,
  		public as: ApiService
  	) { }

  	ngOnInit() {
  		this.ar.params.subscribe( params => {
  			this.id = params.id;
  			this.loadInfo();
  		} )
  	}

    notify() {
      this.as.patch('order/'+this.id)
              .then( res => {
                if (res['err_code'] === 0) {
                  this.info['status'] = 'ok';
                }
              } )
    }

  	loadInfo() {
  		this.as.get('order/'+this.id)
  				.then( res => this.info = res['info'] )
          .then( () => {
            let date = new Date(),
                time = date.valueOf() / 1000;
            this.config = {
              leftTime: this.info['confirm_time']-time,
              template: '$!d!天$!h!时$!m!分'
            };
          } )
  	}

}
