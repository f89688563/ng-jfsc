import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  	selector: 'app-goods-item',
  	templateUrl: './goods-item.component.html',
  	styleUrls: ['./goods-item.component.scss']
})
export class GoodsItemComponent implements OnInit {

	@Input() item: any;

  	constructor() { }

	ngOnInit() {
		
	}

}
