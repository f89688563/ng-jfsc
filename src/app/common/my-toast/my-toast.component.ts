import {
	Component,
	OnInit,
	OnDestroy,
	HostBinding,
	Input,
	Output,
	EventEmitter
} 							from '@angular/core';

import { MyToastConfig }	from './my-toast.config'

@Component({
	selector: 'app-my-toast',
	templateUrl: './my-toast.component.html',
	styleUrls: ['./my-toast.component.scss'],
	host: {
		'[hidden]': '!_showd'
	}
})
export class MyToastComponent implements OnInit, OnDestroy {

	@Input() text: string = 'ok';
	@Input() time: number = 2000;
	@Output() hide = new EventEmitter();
	_showd: boolean = false;
	private timer: any;

	constructor() { }

	ngOnInit() {
	}

	onShow() {
		this._showd = true;
		this.timer = setTimeout( () => this.onHide(), this.time );
		return this;
	}

	onHide() {
		this._showd = false;
		this.hide.emit();
	}

	ngOnDestroy(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

}
