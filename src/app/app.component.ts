import {
	Component,
	OnInit,
	Renderer,
	ElementRef
}							from '@angular/core';
import { Router, ActivatedRoute }			from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	private globalClickCallbackFn: Function;
	cid = 0;

	constructor(
		public renderer: Renderer,
		public elementRef: ElementRef,
		public router: Router,
		public ar: ActivatedRoute
	) {}

  	ngOnInit() {

  		this.ar.params.subscribe( p => console.log('params',p) )

  		this.globalClickCallbackFn = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
			console.log("全局监听点击事件>" + event);
		});

		let uid = localStorage.getItem('uid');
		if(!uid) {
			this.router.navigateByUrl('user/login');
		}
  	}
}
