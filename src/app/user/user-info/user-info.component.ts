import { Component, OnInit }  from '@angular/core';

import { ApiService }			    from '../../shared/api.service';
import { PopIn }              from '../../shared/animations/pop-in';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [PopIn]
})
export class UserInfoComponent implements OnInit {

	uid = localStorage.uid;
  info = {};

  	constructor(
  		public as: ApiService
  	) { }

  	ngOnInit() {
  		this.loadInfo();
  	}

  	loadInfo() {
  		this.as.get('member/'+this.uid)
  				.then( res => this.info = res['info'] )
  	}

}
