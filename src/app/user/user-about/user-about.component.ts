import { Component, OnInit } 	from '@angular/core';
import { URLSearchParams }    from '@angular/http';

import { ApiService }			    from '../../shared/api.service';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.scss']
})
export class UserAboutComponent implements OnInit {

    info: any;
    cid = localStorage.cid;

  	constructor(
  		public as: ApiService
  	) { }

  	ngOnInit() {
  		this.loadInfo();
  	}

  	loadInfo() {
      let params = new URLSearchParams();
      params.set('cid', this.cid);
  		this.as.get('member/about', params)
  				.then( res => this.info = res['info'] );
  	}

}
