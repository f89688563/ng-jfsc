import { Component, OnInit } 	from '@angular/core';
import { ActivatedRoute }		from '@angular/router';

import { ApiService }			from '../../shared/api.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

	info: any;
	id = 0;

	constructor(
		public as: ApiService,
		public ar: ActivatedRoute
	) { }

	ngOnInit() {
		this.ar.params.subscribe( params => this.id = params.id );
		this.loadInfo();
	}

	loadInfo() {
		this.as.get('activity/'+this.id)
				.then( res => this.info = res['info'] );
	}

}
